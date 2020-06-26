import Spacing_Style from './Types/Spacing_Style';
export default {
  type: 'Formula',
  spacingStyle: Spacing_Style.None,
  elements: [
    {
      type: 'Delimiter',
      unicode: '91',
      drain: 'no1',
      spacingStyle: Spacing_Style.Ordinary,
    },
    {
      type: 'Skewed_Fraction',
      source: 'no1',
      numerator: {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Ordinary,
        unicode: '49',
      },
      denominator: {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Ordinary,
        unicode: '50',
      },
    },

    {
      type: 'Delimiter',
      unicode: '93',
      drain: 'no1',
      spacingStyle: Spacing_Style.Ordinary,
    },
    {
      type: 'Stack',

      numerator: {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Ordinary,
        unicode: '97',
      },
      denominator: {
        type: 'Glyph',
        spacingStyle: Spacing_Style.Ordinary,
        unicode: '98',
      },
    },
    {
      type: 'Stretch_Stack',
      nucleus: {
        type: 'Glyph',
        unicode: '8644',
        spacingStyle: Spacing_Style.Relation,
      },
      upperLimit: {
        type: 'Glyph',
        unicode: '1113494',
        spacingStyle: Spacing_Style.Ordinary,
      },
      lowerLimit: {
        type: 'Glyph',
        unicode: '1113495',
        spacingStyle: Spacing_Style.Ordinary,
      },
    },
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
      type: 'Delimiter',
      unicode: '40',
      spacingStyle: Spacing_Style.Ordinary,
    },

    {
      type: 'Delimiter',
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
    {
      type: 'Stretch_Stack',
      nucleus: {
        type: 'Glyph',
        unicode: '8660',
        spacingStyle: Spacing_Style.Relation,
      },
      upperLimit: {
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
      lowerLimit: {
        type: 'Glyph',
        unicode: '1113495',
        spacingStyle: Spacing_Style.Ordinary,
      },
    },
  ],
};
