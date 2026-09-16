// Fonte única de verdade dos dados reais do cliente usados no site.
// Todo valor aqui rastreia até site-forge/research/*.json e site-forge/brief/site-brief.json
// (ver Clientes/@lashhousept/site-forge/). Nunca adicionar dado aqui sem uma fonte real.

export const SITE = {
  nome: "Lash House",
  profissional: "Jéssica",
  handleInstagram: "@lashhousept",
  instagramUrl: "https://www.instagram.com/lashhousept/",
  freshaUrl:
    "https://www.fresha.com/pt/a/lash-house-lisboa-rua-bernardo-lima-48-3d-v9obv43i/all-offer?menu=true&share=true&pId=2891130&utm_source=ig&utm_medium=social&utm_content=link_in_bio&utm_id=97760_v0_s00_e0_tv3",
  mapsUrl: "https://maps.app.goo.gl/zHztMN7i9Z7D2z94A",
  endereco: "R. Bernardo Lima 48, 3º direito, sala 2, 1150-077 Lisboa, Portugal",
} as const;

/**
 * Helper central para qualquer link de agendamento — hoje aponta só para o
 * Fresha (não há WhatsApp nem formulário próprio documentado nas fontes reais
 * desta cliente). Centralizado aqui para que trocar a política de agendamento
 * no futuro seja uma mudança em um único lugar.
 *
 * `lang: "en"` troca o segmento de locale `/pt/a/` por `/en/a/` — verificado
 * manualmente que a Fresha serve uma página de agendamento real em inglês
 * nesse caminho (achado P0 do /impeccable critique 2026-09-12: site vende
 * clientela de "+30 países" mas só linkava para o agendamento em português).
 */
export function bookingLink(lang: "pt" | "en" = "pt"): string {
  if (lang === "en") {
    return SITE.freshaUrl.replace("/pt/a/", "/en/a/");
  }
  return SITE.freshaUrl;
}
