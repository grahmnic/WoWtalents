import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IRootState } from '../store';
import config from '../../config';
import { isEmpty } from '../../helpers/isEmpty';

interface ITalentsState {
  talents: Talent[];
  activeTalent: Talent;
  draft: Talent;
  icons: any;
  lookup: any;
  loaded: boolean;
}

export const get_icons = createAsyncThunk('get/icons', async () => {
  const res = await fetch(`${config.publicPath}api/icons`);

  return await res.json();
});

const initialDraft: Talent = {
  id: '',
  label: '',
  summary: '',
  fileId: '134400',
  ranks: 1,
  isActive: false
}

export const initialState: ITalentsState = {
  talents: [{
    id: '1',
    label: 'Planar Shift',
    summary: 'You enter another plane for 8 seconds taking 50% reduced physical damage and 30% reduced magic damage.',
    fileId: '538565',
    ranks: 2,
    isActive: true,
    castTime: 0,
    cooldown: 120
  }, {
    id: '2',
    label: 'Lava Burst',
    summary: 'Hurls molten lava at the target, dealing (97.2% spell power) Fire damage.',
    fileId: '237582',
    ranks: 1,
    isActive: true,
    castTime: 2,
    cooldown: 8,
    charges: 2,
    cost: 2.5,
    resource: 'mana',
    maxRange: 40
  }, {
    id: '3',
    label: 'Fire and Ice',
    summary: 'Increases all Fire and Frost damage you deal by 3%.',
    fileId: '429384',
    ranks: 1,
    isActive: false
  }],
  draft: initialDraft,
  icons: [],
  lookup: [],
  activeTalent: null,
  loaded: false
};

export const talents = createSlice({
  name: 'talents',
  initialState,
  reducers: {
      addTalent(state, action: PayloadAction<Talent>) {
        state.talents.push(action.payload);
      },
      removeTalent(state, action: PayloadAction<string>) {
        state.talents = state.talents.filter(talent => talent.id !== action.payload);
      },
      updateTalent(state, action: PayloadAction<Talent>) {
        const index = state.talents.findIndex(talent => talent.id === action.payload.id);
        state.talents[index] = action.payload;
        const t = state.talents[index];
        const isActive = t.isActive;
        const isZero = (n) => typeof n !== 'undefined' && n !== null && n == 0;
        if (!isActive || isZero(t.cost)) {
          delete state.talents[index].cost;
        }
        if (!isActive || isEmpty(t.resource)) {
          delete state.talents[index].resource;
        }
        if (!isActive) {
          delete state.talents[index].isMelee;
        }
        if (!isActive || t.isMelee) {
          delete state.talents[index].minRange;
          delete state.talents[index].maxRange;
        }
        if (!isActive || isZero(t.castTime)) {
          delete state.talents[index].castTime;
        }
        if (!isActive || isZero(t.cooldown)) {
          delete state.talents[index].cooldown;
        }
        if (!isActive || isZero(t.charges)) {
          delete state.talents[index].charges;
        }
        state.activeTalent = null;
      },
      setActiveTalent(state, action: PayloadAction<string | null>) {
        state.activeTalent = action.payload ? state.talents.find(talent => talent.id === action.payload) : null;
        if (!state.activeTalent && typeof action.payload === 'string') {
          state.draft.id = action.payload;
          state.activeTalent = state.draft;
        }
      },
      clearDraft(state) {
        state.draft = structuredClone(initialDraft);
      }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action:any) => {
      return {
          ...state,
          ...action.payload.auth,
      };
    }),
    builder.addCase(get_icons.pending, (state, action) => {
      state.loaded = false;
    }),
    builder.addCase(get_icons.fulfilled, (state, action) => {
      state.loaded = true;
      let icons = {};
      let lookup = {};
      action.payload.forEach((icon) => {
        icons[icon.file_data_id.toString()] = {
          value: icon.value
        };
        lookup[icon.value] = {
          file_data_id: icon.file_data_id
        };
      });
      state.icons = icons;
      state.lookup = lookup;
    })
  }
});

export const {
  addTalent,
  removeTalent,
  updateTalent,
  setActiveTalent,
  clearDraft
} = talents.actions;

 // Selectors
export const selectTalents = (state: IRootState) => state.talents

export default talents.reducer