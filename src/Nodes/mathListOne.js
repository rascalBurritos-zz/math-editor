import Spacing_Style from './Types/Spacing_Style';
export default {
  type: 'Formula',
  spacingStyle: Spacing_Style.None,
  elements: [
    {
      type: 'Scripts',
      nucleus: {
        type: 'Glyph',
        unicode: '120',
        spacingStyle: Spacing_Style.Ordinary,
      },
      superscript: {
        type: 'Operator',
        unicode: '8747',
        lowerLimit: {
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
        upperLimit: {
          type: 'Glyph',
          unicode: '65',
          spacingStyle: Spacing_Style.Ordinary,
        },
      },
    },
    {
      type: 'Operator',
      unicode: '8747',
      drain: 'BigBoi',
      lowerLimit: {
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
      upperLimit: {
        type: 'Glyph',
        unicode: '65',
        spacingStyle: Spacing_Style.Ordinary,
      },
    },
    {
      type: 'Operator',
      unicode: '8721',
      drain: 'BigBoi',
      lowerLimit: {
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
      upperLimit: {
        type: 'Glyph',
        unicode: '65',
        spacingStyle: Spacing_Style.Ordinary,
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
      type: 'Radical',
      source: 'BigBoi',
      radicand: {
        type: 'Formula',
        elements: [
          {
            type: 'Glyph',
            unicode: '89',
            spacingStyle: Spacing_Style.Ordinary,
          },
          {
            type: 'Glyph',
            unicode: '43',
            spacingStyle: Spacing_Style.Binary,
          },
          {
            type: 'Radical',
            radicand: {
              type: 'Formula',
              elements: [
                {
                  type: 'Glyph',
                  unicode: '89',
                  spacingStyle: Spacing_Style.Ordinary,
                },
                {
                  type: 'Glyph',
                  unicode: '43',
                  spacingStyle: Spacing_Style.Binary,
                },
                {
                  type: 'Radical',
                  radicand: {
                    type: 'Formula',
                    elements: [
                      {
                        type: 'Glyph',
                        unicode: '89',
                        spacingStyle: Spacing_Style.Ordinary,
                      },
                      {
                        type: 'Glyph',
                        unicode: '43',
                        spacingStyle: Spacing_Style.Binary,
                      },
                      {
                        type: 'Radical',
                        radicand: {
                          type: 'Formula',
                          elements: [
                            {
                              type: 'Glyph',
                              unicode: '89',
                              spacingStyle: Spacing_Style.Ordinary,
                            },
                            {
                              type: 'Glyph',
                              unicode: '43',
                              spacingStyle: Spacing_Style.Binary,
                            },
                            {
                              type: 'Radical',
                              radicand: {
                                type: 'Formula',
                                elements: [
                                  {
                                    type: 'Glyph',
                                    unicode: '89',
                                    spacingStyle: Spacing_Style.Ordinary,
                                  },
                                  {
                                    type: 'Glyph',
                                    unicode: '43',
                                    spacingStyle: Spacing_Style.Binary,
                                  },
                                  {
                                    type: 'Radical',
                                    radicand: {
                                      type: 'Formula',
                                      elements: [
                                        {
                                          type: 'Glyph',
                                          unicode: '89',
                                          spacingStyle: Spacing_Style.Ordinary,
                                        },
                                        {
                                          type: 'Glyph',
                                          unicode: '43',
                                          spacingStyle: Spacing_Style.Binary,
                                        },
                                        {
                                          type: 'Radical',
                                          radicand: {
                                            type: 'Formula',
                                            elements: [
                                              {
                                                type: 'Glyph',
                                                unicode: '89',
                                                spacingStyle:
                                                  Spacing_Style.Ordinary,
                                              },
                                              {
                                                type: 'Glyph',
                                                unicode: '43',
                                                spacingStyle:
                                                  Spacing_Style.Binary,
                                              },
                                            ],
                                            spacingStyle:
                                              Spacing_Style.Ordinary,
                                          },
                                          degree: {
                                            type: 'Formula',
                                            elements: [
                                              {
                                                type: 'Glyph',
                                                unicode: '82',
                                                spacingStyle:
                                                  Spacing_Style.Ordinary,
                                              },
                                            ],
                                            spacingStyle:
                                              Spacing_Style.Ordinary,
                                          },
                                        },
                                      ],
                                      spacingStyle: Spacing_Style.Ordinary,
                                    },
                                    degree: {
                                      type: 'Formula',
                                      elements: [
                                        {
                                          type: 'Glyph',
                                          unicode: '82',
                                          spacingStyle: Spacing_Style.Ordinary,
                                        },
                                      ],
                                      spacingStyle: Spacing_Style.Ordinary,
                                    },
                                  },
                                ],
                                spacingStyle: Spacing_Style.Ordinary,
                              },
                              degree: {
                                type: 'Formula',
                                elements: [
                                  {
                                    type: 'Glyph',
                                    unicode: '82',
                                    spacingStyle: Spacing_Style.Ordinary,
                                  },
                                ],
                                spacingStyle: Spacing_Style.Ordinary,
                              },
                            },
                          ],
                          spacingStyle: Spacing_Style.Ordinary,
                        },
                        degree: {
                          type: 'Formula',
                          elements: [
                            {
                              type: 'Glyph',
                              unicode: '82',
                              spacingStyle: Spacing_Style.Ordinary,
                            },
                          ],
                          spacingStyle: Spacing_Style.Ordinary,
                        },
                      },
                    ],
                    spacingStyle: Spacing_Style.Ordinary,
                  },
                  degree: {
                    type: 'Formula',
                    elements: [
                      {
                        type: 'Glyph',
                        unicode: '82',
                        spacingStyle: Spacing_Style.Ordinary,
                      },
                    ],
                    spacingStyle: Spacing_Style.Ordinary,
                  },
                },
              ],
              spacingStyle: Spacing_Style.Ordinary,
            },
            degree: {
              type: 'Formula',
              elements: [
                {
                  type: 'Glyph',
                  unicode: '82',
                  spacingStyle: Spacing_Style.Ordinary,
                },
              ],
              spacingStyle: Spacing_Style.Ordinary,
            },
          },
        ],
        spacingStyle: Spacing_Style.Ordinary,
      },
      degree: {
        type: 'Formula',
        elements: [
          {
            type: 'Glyph',
            unicode: '82',
            spacingStyle: Spacing_Style.Ordinary,
          },
        ],
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
      type: 'Variant_Glyph',
      unicode: '8658',
      spacingStyle: Spacing_Style.Binary,
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
