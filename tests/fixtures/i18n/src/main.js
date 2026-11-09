import i18next from "i18next";
import en from "../locales/en.json" with { type: "json" };
import es from "../locales/es.json" with { type: "json" };

await i18next.init({ lng: "en", resources: { en: { translation: en }, es: { translation: es } } });
document.title = i18next.t("title");
document.querySelector("#date").textContent = new Date().getDate() + "/" + (new Date().getMonth() + 1);
