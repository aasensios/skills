import moment from "moment";
import { button } from "@fixture/ui";
document.querySelector("#app").append(button(moment().format("YYYY")));
