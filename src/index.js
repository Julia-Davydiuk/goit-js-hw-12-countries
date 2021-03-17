import './styles.css';
import fetchCountries from './fetchCountries.js';
import template from './templates/template.hbs';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/BrightTheme.css';
import 'material-design-icons/iconfont/material-icons.css';

import { error, alert, defaultModules} from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

  alert({
    text: 'Too many matches found. Please enter a more specific quety.'
  });

  const inputRef = document.querySelector('.search__input');
  const resultsRef = document.querySelector('.search__result');
  inputRef.addEventListener('input', debounce(markup, 500));

  function markup (event) {
    resultsRef.innerHTML = '';

    const countrySearchName = event.target.value;
    fetchCountries(countrySearchName)
      .then(data => {
        if (data.length > 10) {
          alert({
            text: 'Too many matches found. Please enter a more specific query!',
            type: 'error',
            delay: 4000,
            stack: new Stack({
              dir1: 'up',
            }),
          });
        }
        if (data.length >= 2 && data.length <= 10) {
          resultsRef.insertAdjacentHTML(
            'beforeend',
            createListCountriesTemplate(data),
            // search__result-languages-list 
          );
        }
        if (data.length === 1) {
          resultsRef.insertAdjacentHTML(
            'beforeend',
            createCountryPropertiesTemplate(data),
          );
        }
      })
      .catch(console.log);
  }