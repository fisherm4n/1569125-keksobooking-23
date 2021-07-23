import "./utils.js";
import "./generate-templates.js";
import "./map.js";
import {createSuccessMessage, createErrorsMessage, showAlert} from './page.js';
import { getOffersData } from './fetch-data.js';
import {setUserFormSubmit} from "./form-offer.js"
import { generateTemplate } from "./generate-templates.js";
const OFFERS_QUANTITY = 10;


// getOffersData((offers) => {
//   offers.slice(0, OFFERS_QUANTITY).forEach((offer) => {
//     generatePoint (offer);
//   });},
// showAlert);
