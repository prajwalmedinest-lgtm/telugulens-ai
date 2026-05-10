import { env } from '../config/env.js';
import fs from 'fs';
import path from 'path';

let supabase: any = null;
if (env.SUPABASE_URL && env.SUPABASE_KEY) {
  // lazy import to avoid requiring in environments without it
  // @ts-ignore
  const { createClient } = await import('@supabase/supabase-js');
  supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
}

export const storage = {
  async uploadBuffer(filename: string, buffer: Buffer, contentType: string) {
    const safeName = filename.replace(/[^a-zA-Z0-9._-]+/g, '_');
    if (supabase) {
      const objectPath = `uploads/${Date.now()}_${safeName}`;
      const res = await supabase.storage.from('uploads').upload(objectPath, buffer, { contentType });
      if (res.error) throw res.error;
      const url = supabase.storage.from('uploads').getPublicUrl(objectPath).data.publicUrl;
      return { provider: 'supabase', url, path: objectPath };
    }

    // Fallback: save to local uploads folder (not recommended for prod)
    const uploadsDir = path.resolve(process.cwd(), 'uploads');
    await fs.promises.mkdir(uploadsDir, { recursive: true });
    const p = path.join(uploadsDir, `${Date.now()}_${safeName}`);
    await fs.promises.writeFile(p, buffer);
    return { provider: 'local', path: p, url: undefined };
  },
};
