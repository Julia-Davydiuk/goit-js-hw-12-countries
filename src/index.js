import './styles.css';
import fetchCountries from './fetchCountries.js';
import template from './templates/template.hbs';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/BrightTheme.css';
import 'material-design-icons/iconfont/material-icons.css';
import { Stack } from '@pnotify/core';
import { alert, defaultModules} from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

  const inputRef = document.querySelector('.search__input');
  const resultsRef = document.querySelector('.search__result');
  const listResultRef = document.querySelector('.search__list-result');

  inputRef.addEventListener('input', debounce(onInput, 500));

  function onInput (event) {
    const searchQuery = event.target.value !== '' ? `name/${event.target.value}` : '';
    fetchCountries(searchQuery)
    .then(response => response.json())
      .then(data => {
        listResultRef.innerHTML = '';
        resultsRef.innerHTML = '';
        if (data.length > 10) {
          alert({
            text: 'Too many matches found. Please enter a more specific query!',
            type: 'error',
            delay: 2000,
            stack: new Stack({
              dir1: 'up',
            }),
          });
          return;
        }
        if (data.length > 1) {
          const markup = data.reduce((acc, item) => {
            acc += `<li>${item.name}</li>`;
            return acc;
          }, '');
          listResultRef.insertAdjacentHTML('beforeend', markup);
        }
        if (data.length === 1) {
          resultsRef.insertAdjacentHTML(
            'beforeend',
            template(data),
          );
        }
      })
      .catch((err) => console.log(err));
  }