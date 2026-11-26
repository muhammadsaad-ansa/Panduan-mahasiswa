/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize GoogleGenAI server-side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API route for AI writing & thesis assistant & checker
  app.post('/api/ai/assist', async (req, res) => {
    try {
      const { prompt, action } = req.body;
      let systemInstruction = "You are an expert academic research assistant, thesis reviewer, and strict thesis supervisor in Indonesian. Provide formal, constructive academic evaluations, outlines, proofreading, and detailed checks.";
      let userPrompt = prompt;

      if (action === 'outline') {
        userPrompt = `Buatkan kerangka/outline skripsi atau bab penelitian yang komprehensif, akademis, dan terstruktur untuk topik berikut:\n\n${prompt}`;
      } else if (action === 'proofread') {
        userPrompt = `Perbaiki tata bahasa, tingkatkan keformalan akademik, dan sempurnakan draf teks berikut:\n\n${prompt}`;
      } else if (action === 'expand') {
        userPrompt = `Kembangkan poin atau paragraf berikut menjadi pembahasan akademik yang mendalam dan komprehensif:\n\n${prompt}`;
      } else if (action === 'abstract') {
        userPrompt = `Buatkan draf abstrak ilmiah (Latar Belakang, Metode, Hasil, Kesimpulan, Kata Kunci) dalam bahasa Indonesia dan Inggris berdasarkan catatan berikut:\n\n${prompt}`;
      } else if (action === 'check') {
        userPrompt = `Lakukan audit dan AI Pengecek (Reviewer Akademik) secara komprehensif terhadap draf naskah skripsi berikut:\n\n${prompt}\n\nBerikan hasil audit dalam format laporan terstruktur yang mencakup:
1. **Skor Kualitas Akademik (0-100)** beserta ringkasan.
2. **Evaluasi Tata Bahasa & Ejaan (EYD / PUEBI)**.
3. **Kohesi & Alur Logika Argumen**.
4. **Indikasi Keaslian & Saran Parafrase** untuk menghindari plagiasi.
5. **Daftar Rekomendasi Perbaikan Konkret** bagi penulis.`;
      } else if (action === 'question') {
        userPrompt = `Jawab pertanyaan atau berikan saran riset/metodologi berikut secara akademis:\n\n${prompt}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: userPrompt,
        config: {
          systemInstruction,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      const errMessage = error?.message || '';
      const isQuota = errMessage.includes('429') || errMessage.includes('RESOURCE_EXHAUSTED') || errMessage.includes('quota');
      if (isQuota) {
        return res.status(429).json({ 
          error: 'Kuota API Gemini terlampaui (429 Resource Exhausted). Fitur penulisan manual, manajemen dokumen, dan ekspor PDF tetap berfungsi normal.' 
        });
      }
      res.status(500).json({ error: errMessage || 'Internal server error' });
    }
  });

  // API route for AI Research Search & Grounding (solves iframe blocking by fetching grounded literature summaries)
  app.post('/api/ai/research-search', async (req, res) => {
    try {
      const { query } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `Cari dan berikan ringkasan literatur ilmiah, jurnal, atau informasi akademis terkini mengenai topik riset berikut: "${query}". Sertakan poin-poin utama, temuan riset, dan referensi sumber yang relevan.`,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are an expert academic research assistant. Search the web for academic sources and provide precise, well-structured summaries with citations in Indonesian."
        }
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = chunks.map((c: any) => c.web ? { title: c.web.title, uri: c.web.uri } : null).filter(Boolean);

      res.json({ text: response.text, sources });
    } catch (error: any) {
      console.error("Research search error:", error);
      const errMessage = error?.message || '';
      const isQuota = errMessage.includes('429') || errMessage.includes('RESOURCE_EXHAUSTED') || errMessage.includes('quota');
      if (isQuota) {
        return res.status(429).json({ 
          error: 'Kuota pencarian AI terlampaui (429). Gunakan tab Web Browser di 2 Layar atau buka situs asli.',
          sources: []
        });
      }
      res.status(500).json({ error: errMessage || 'Internal server error' });
    }
  });

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
