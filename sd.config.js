import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

export default {
  source: ['tokens/*.json'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      prefix: '',
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            selector: ':root',
            outputReferences: false
          }
        }
      ]
    },
    scss: {
      transformGroup: 'tokens-studio',
      prefix: '',
      buildPath: 'build/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables',
          options: {
            outputReferences: false
          }
        }
      ]
    }
  }
};
