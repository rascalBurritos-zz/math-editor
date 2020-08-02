export const SET_TYPE = { VIEW: 'View', MODEL: 'Model', BOTH: 'Both' };

export const DangerousSetContainer = {
  _modelPool: {},
  _viewPool: {},
  register: (type, setFunction, setType) => {
    if (setType === SET_TYPE.VIEW) {
      DangerousSetContainer._viewPool[type] = setFunction;
    } else if (setType === SET_TYPE.MODEL) {
      DangerousSetContainer._modelPool[type] = setFunction;
    } else {
      DangerousSetContainer._viewPool[type] = setFunction;
      DangerousSetContainer._modelPool[type] = setFunction;
    }
  },
  retrieve: (type, isView) => {
    if (isView) {
      return DangerousSetContainer._viewPool[type];
    } else {
      return DangerousSetContainer._modelPool[type];
    }
  },
};
