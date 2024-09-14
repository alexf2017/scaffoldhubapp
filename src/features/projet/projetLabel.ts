import { Projet } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function projetLabel(projet?: Partial<Projet> | null, dictionary?: Dictionary) {
  return String(projet?.title != null ? projet.title : '');
}
