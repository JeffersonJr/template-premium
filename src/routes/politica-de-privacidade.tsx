import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { ADDRESS, PHONE_LABEL, PHONE_RENT_LABEL } from "@/data/properties";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Premium House Imóveis" },
      { name: "description", content: "Saiba como a Premium House Imóveis trata informações durante a navegação neste site e como entrar em contato." },
      { property: "og:title", content: "Política de Privacidade | Premium House Imóveis" },
      { property: "og:description", content: "Informações sobre privacidade e dados neste site." },
    ],
    links: [{ rel: "canonical", href: "https://premium-house-imoveis-2026.microsistec.chatgpt.site/politica-de-privacidade" }],
  }),
  component: () => (
    <PageShell>
      <main className="container-x max-w-5xl py-12 md:py-16">
        <header className="mb-10 border-b pb-8 md:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Premium House Imóveis</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Política de Privacidade</h1>
          <p className="mt-3 text-sm text-muted-foreground">Atualizada em 23 de outubro de 2026</p>
          <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">
            Esta página explica, de forma direta, quais informações podem ser tratadas durante o uso deste site e como elas são utilizadas. O site atual tem caráter demonstrativo: os formulários exibidos não enviam nem armazenam as respostas preenchidas.
          </p>
        </header>

        <div className="space-y-9 text-[15px] leading-7 text-muted-foreground md:space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Quem somos</h2>
            <p className="mt-3">O site é apresentado em nome da Premium House Imóveis. Os contatos atualmente exibidos são <a className="font-medium text-primary underline-offset-4 hover:underline" href="mailto:contato@premiumhouse.com.br">contato@premiumhouse.com.br</a>, {PHONE_LABEL} (vendas), {PHONE_RENT_LABEL} (locação) e {ADDRESS}.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Informações tratadas neste site</h2>
            <p className="mt-3">Você pode navegar por páginas e imóveis sem preencher dados pessoais. Algumas funções guardam informações somente no próprio navegador:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Imóveis favoritos: os identificadores dos imóveis marcados como favoritos ficam no armazenamento local do navegador para que a seleção continue disponível nesse dispositivo. Você pode removê-los pela própria página de favoritos ou limpando os dados do navegador.</li>
              <li>Preferências de privacidade: a escolha sobre conteúdo externo fica salva no armazenamento local deste navegador para ser respeitada nas próximas visitas. A preferência pode ser revista em “Preferências de cookies”, no rodapé.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Formulários demonstrativos</h2>
            <p className="mt-3">Os formulários de contato, newsletter, cadastro de imóvel, trabalhe conosco, encomenda de imóvel, depoimento e demonstrações de landing pages são apenas visuais nesta versão. Ao enviar, a página apresenta uma confirmação local, mas não transmite os campos para a Premium House nem os grava em banco de dados. Por isso, não insira informações pessoais reais nesses formulários demonstrativos.</p>
            <p className="mt-3">Se você iniciar contato pelos canais de telefone, e-mail ou WhatsApp exibidos no site, as informações que decidir enviar serão tratadas pelo canal escolhido e poderão ser recebidas pela equipe para responder à sua solicitação. O WhatsApp e outros serviços externos aplicam seus próprios termos e políticas.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Para que as informações são usadas</h2>
            <p className="mt-3">As informações mantidas localmente são usadas apenas para habilitar funções do site, como lembrar seus favoritos ou uma preferência de interface. Mensagens que você enviar voluntariamente pelos canais de contato poderão ser usadas para atender e dar continuidade ao pedido feito.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Serviços e conteúdo de terceiros</h2>
            <p className="mt-3">Mapas do Google, vídeos do YouTube e tours virtuais de outros provedores ficam bloqueados até que você autorize “Conteúdo externo” nas preferências ou use o botão para permitir o conteúdo na própria página. Depois de carregados, esses serviços podem receber dados técnicos, como endereço IP e informações do navegador, e aplicar tecnologias próprias conforme suas políticas. Links para WhatsApp, Instagram e outras redes também levam a serviços com políticas próprias. O site ainda carrega fontes hospedadas pelo Google Fonts; essa solicitação pode transmitir dados técnicos de conexão ao provedor.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Cookies e armazenamento no navegador</h2>
            <p className="mt-3">Nesta versão, o site não usa cookies de publicidade nem ferramentas próprias de análise comportamental. A preferência de consentimento e os favoritos são guardados no armazenamento local do navegador; não são enviados ao servidor do site e podem ser removidos limpando os dados do navegador. Conteúdos de terceiros não são carregados enquanto “Conteúdo externo” estiver desativado. Ao permitir esse conteúdo, o provedor correspondente poderá usar cookies ou tecnologias semelhantes, conforme as próprias políticas. Você pode rejeitar os recursos opcionais ou alterar sua escolha a qualquer momento em “Preferências de cookies”, no rodapé.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Seus direitos e solicitações</h2>
            <p className="mt-3">Quando houver tratamento de dados pessoais relacionado à Premium House, você pode solicitar informações sobre esse tratamento e exercer os direitos previstos na legislação aplicável, incluindo confirmação, acesso, correção e eliminação, conforme o caso. Para enviar uma solicitação, escreva para <a className="font-medium text-primary underline-offset-4 hover:underline" href="mailto:contato@premiumhouse.com.br">contato@premiumhouse.com.br</a>. Favoritos salvos apenas no seu navegador podem ser removidos diretamente no dispositivo.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Atualizações desta política</h2>
            <p className="mt-3">Esta política poderá ser atualizada para refletir mudanças no site, nos canais de atendimento ou nas práticas de privacidade. A data no início da página indica a revisão mais recente.</p>
          </section>
        </div>

        <aside className="mt-12 rounded-2xl border bg-muted/40 p-5 text-sm leading-6 text-muted-foreground md:p-6">
          Esta descrição corresponde ao funcionamento demonstrativo identificado no site na data de atualização. Antes de ativar formulários integrados ao CRM, será necessário revisar esta política para explicar o fluxo real de coleta, acesso, compartilhamento e retenção.
        </aside>
      </main>
    </PageShell>
  ),
});
