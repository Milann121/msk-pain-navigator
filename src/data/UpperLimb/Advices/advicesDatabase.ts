
export interface Advice {
  adviceId: number;
  adviceTitle: string;
  adviceSubtitle: string;
  advicePriority: string;
  adviceRule: string;
  adviceDescription: string;
  adviceImageUrl: string;
  adviceLink: string;
}

export const advices: Advice[] = [
  {
    adviceId: 1,
    adviceTitle: "Pravidelná zmena polohy",
    adviceSubtitle: " ",
    advicePriority: "Vysoká",
    adviceRule: "Každých 45-60min.",
    adviceDescription: "Vaše bolesti môžu byť spôsobované aj statickou záťažou, ktorá pri vašom probléme nie je vhodná. Snažte sa pravidelné meniť polohy, čo vám zabezpečí potrebnú úľavu od bolesti a zníženie rizika ďalších bolestí.",
    adviceImageUrl: "https://via.placeholder.com/150",
    adviceLink: "https://www.google.com",
  },
];
