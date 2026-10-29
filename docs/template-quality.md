# Qualidade visual do template: desempenho, acessibilidade e SEO

Este checklist orienta a implementação visual e a validação do template antes de conectar qualquer CRM. O formulário e os dados demonstrativos continuam sem integração; não se deve interpretar as confirmações da interface como armazenamento real.

## Metas de aprovação

- Lighthouse, em páginas representativas no mobile e desktop: pelo menos 90 em Desempenho e 95 em Acessibilidade e SEO. Guardar o relatório e registrar URL, dispositivo, data e condições de teste; não apresentar metas como resultados medidos.
- Core Web Vitals em dados reais, no percentil 75 e separados por mobile e desktop: LCP até 2,5 s, INP até 200 ms e CLS até 0,1. Lighthouse de laboratório ajuda a encontrar problemas, mas não substitui dados de campo.
- Validar pelo menos a home, busca de imóveis, busca de empreendimentos, ficha de imóvel, artigo e formulário. Repetir após mudanças de conteúdo, mídia, componentes globais ou comportamento responsivo.

## Desempenho

- Reservar dimensões ou proporção para imagens e embeds; evitar que a página salte durante o carregamento.
- Carregar a imagem principal com prioridade alta e usar carregamento lazy para mídia fora da primeira dobra. Usar versões dimensionadas/comprimidas para a exibição real, formatos modernos quando o pipeline e o navegador suportarem, e `decoding="async"` em imagens secundárias.
- Manter fontes enxutas, com fallback local e `font-display: swap`; revisar o custo de fontes e recursos de terceiros. Não carregar vídeo, tour ou mapa incorporado até que a seção correspondente seja necessária.
- Preferir componentes e dependências já presentes, carregar conteúdo abaixo da dobra sob demanda e remover código realmente sem uso após confirmar referências.
- Considerar desempenho em rede móvel e CPU limitada, não só em ambiente local rápido.

## Acessibilidade

- Usar landmarks semânticos, uma hierarquia coerente de títulos, link de salto para o conteúdo, labels associados aos campos e nomes acessíveis para controles só com ícone.
- Garantir operação completa por teclado, ordem de foco previsível, foco visível, foco contido/restaurado em diálogos e anúncio de mensagens de estado/erro.
- Respeitar `prefers-reduced-motion`; não depender só de cor, hover, placeholder ou animação para comunicar estado.
- Verificar contraste dos textos e controles, alvos de toque, zoom/reflow em 200–400%, mensagens de validação e leitura com VoiceOver/NVDA. Repetir testes com teclado e leitor de tela.
- Usar axe/Lighthouse como apoio; automatização não substitui revisão manual de conteúdo, navegação, foco e formulários.

## SEO técnico e de conteúdo

- Manter título e descrição únicos e úteis por página; adicionar canonical absoluto, Open Graph e imagem social coerentes nas páginas indexáveis.
- Publicar sitemap apenas com URLs canônicas e indexáveis. Excluir favoritos, demonstrações e estados de busca com parâmetros; manter `robots.txt` apontando para o sitemap.
- Usar links HTML rastreáveis, conteúdo principal renderizado no servidor, texto alternativo que descreva a imagem relevante e headings que representem o conteúdo real.
- Adicionar dados estruturados somente quando correspondem aos dados verdadeiros da página; validar no Rich Results Test e no Schema Markup Validator. Dados estruturados não garantem destaque nos resultados.
- Após publicação, conferir indexação e erros no Search Console. Corrigir URLs inválidas/duplicadas e atualizar sitemap quando o catálogo mudar.

## Verificação por entrega

1. Rodar testes, lint e build de produção.
2. Testar os fluxos essenciais com mouse, toque, teclado e pelo menos um leitor de tela; revisar console e layout em larguras estreitas e amplas.
3. Executar Lighthouse em mobile e desktop nas páginas representativas e salvar os relatórios.
4. Conferir sitemap/robots, titles, descriptions, canonicals, imagens sociais e structured data das URLs indexáveis.
5. Registrar resultados, data, URLs e itens pendentes; só afirmar que uma nota foi atingida quando houver relatório reproduzível.

Referências: [Core Web Vitals](https://web.dev/articles/vitals), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) e [URLs canônicas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
