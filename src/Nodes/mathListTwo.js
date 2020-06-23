import Spacing_Style from './Types/Spacing_Style';
export default {
  type: 'Formula',
  spacingStyle: Spacing_Style.None,
  elements: [
    {
      type: 'Fraction',

      numerator: {
        type: 'Formula',
        spacingStyle: Spacing_Style.Operator,
        elements: [
          {
            type: 'Glyph',
            unicode: '120',
            spacingStyle: Spacing_Style.Ordinary,
          },
          {
            type: 'Glyph',
            unicode: '61',
            spacingStyle: Spacing_Style.Binary,
          },
          {
            type: 'Glyph',
            unicode: '50',
            spacingStyle: Spacing_Style.Ordinary,
          },
        ],
      },
      denominator: {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Ordinary,
        unicode: '98',
      },
    },
    {
      type: 'Scripts',
      nucleus: {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Binary,
        unicode: '50',
      },

      superscript: {
        type: 'Fraction',

        numerator: {
          type: 'Formula',
          spacingStyle: Spacing_Style.Operator,
          elements: [
            {
              type: 'Glyph',
              unicode: '120',
              spacingStyle: Spacing_Style.Ordinary,
            },
            {
              type: 'Glyph',
              unicode: '61',
              spacingStyle: Spacing_Style.Binary,
            },
            {
              type: 'Glyph',
              unicode: '50',
              spacingStyle: Spacing_Style.Ordinary,
            },
          ],
        },
        denominator: {
          type: 'Glyph',
          spacingStyle: Spacing_Style.Ordinary,
          unicode: '98',
        },
      },
      subscript: {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Ordinary,
        unicode: '50',
      },
    },
    {
      type: 'Accent',
      nucleus: {
        type: 'Glyph',
        unicode: '65',
        spacingStyle: Spacing_Style.Ordinary,
      },
      accenter: {
        type: 'Glyph',
        unicode: '776',
        spacingStyle: Spacing_Style.Ordinary,
      },
    },
    {
      type: 'Variant_Glyph',
      unicode: '40',
      spacingStyle: Spacing_Style.Ordinary,
    },
    {
      type: 'Variant_Glyph',
      // unicode: '8658',
      unicode: '8747',
      spacingStyle: Spacing_Style.Binary,
    },
    {
      type: 'Variant_Glyph',
      unicode: '41',
      spacingStyle: Spacing_Style.Ordinary,
    },

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
