import { MetadataRoute } from 'next';
import { categorias, tags, tagSlug, bairros } from '@/lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://caseirinhasdatata.shop';
  const lastModified = new Date();

  const paginasFixas: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/cardapio`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/servicos`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contatos`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/categorias`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/tags`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/mapa-do-site`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const paginasCategorias: MetadataRoute.Sitemap = categorias.map((cat) => ({
    url: `${baseUrl}/categorias/${cat.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const paginasTags: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tags/${tagSlug(tag)}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const paginasBairros: MetadataRoute.Sitemap = Object.keys(bairros).map((slug) => ({
    url: `${baseUrl}/entregas/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...paginasFixas, ...paginasCategorias, ...paginasTags, ...paginasBairros];
}
