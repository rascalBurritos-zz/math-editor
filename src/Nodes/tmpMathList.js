import Spacing_Style from './Types/Spacing_Style';
export default {
  type: 'Formula',
  spacingStyle: Spacing_Style.None,
  elements: [
    {
      type: 'Scripts',
      nucleus: {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Ordinary,
        unicode: '120596',
      },
      superscript: {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Ordinary,
        unicode: '98',
      },
      spacingStyle: Spacing_Style.None,
    },
    {
      type: 'Glyph',
      spacingStyle: Spacing_Style.Binary,
      unicode: '61',
    },
    {
      type: 'Scripts',
      nucleus: {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Ordinary,
        unicode: '8747',
        centered: true,
      },
      superscript: {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Ordinary,
        unicode: '49',
      },
      subscript: {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Ordinary,
        unicode: '50',
      },
    },
    {
      type: 'Glyph',
      spacingStyle: Spacing_Style.Ordinary,
      unicode: '112',
    },
    {
      type: 'Glyph',
      spacingStyle: Spacing_Style.Binary,
      unicode: '109',
    },
    {
      type: 'Glyph',
      spacingStyle: Spacing_Style.Ordinary,
      unicode: '65',
    },
  ],
};
