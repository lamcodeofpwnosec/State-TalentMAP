import { faBalanceScaleLeft, faChessQueen, faDiceSix,
  faGraduationCap, faLanguage, faMedal, faPercentage,
  faRegistered, faSeedling, faSpa, faTree, faUserFriends } from '@fortawesome/free-solid-svg-icons';

export const Classifications = [
  {
    code: '3',
    text: '3rd Tour Bidders',
    seasons: [{ id: 185, season_text: null }],
    glossary_term: '3rd Tour Bidders',
  },
  {
    code: '4',
    text: 'Tenured',
    seasons: [{ id: 215, season_text: 'Summer 2023' }, { id: 214, season_text: 'Summer 2022' }],
    glossary_term: 'Tenured',
  },
  {
    code: 'D',
    text: 'Differential Bidder',
    seasons: [{ id: 215, season_text: 'Summer 2023' }, { id: 214, season_text: 'Summer 2022' }],
    glossary_term: 'Differential Bidder',
  },
  {
    code: 'T',
    text: 'Tandem Bidder',
    seasons: [{ id: 185, season_text: null }],
    glossary_term: 'Tandem',
  },
  {
    code: 'M',
    text: 'Meritorious Step Increases',
    seasons: [{ id: 185, season_text: null }],
    glossary_term: 'Meritorious Step Increases',
  },
  {
    code: '6',
    text: '6/8 Rule',
    seasons: [{ id: 185, season_text: null }],
    glossary_term: '6/8 Rule',
  },
  {
    code: 'F',
    text: 'Fair Share Bidders',
    seasons: [{ id: 185, season_text: null }],
    glossary_term: 'Fair Share',
  },
  {
    code: 'C',
    text: 'Critical Need Language',
    seasons: [{ id: 185, season_text: null }],
    glossary_term: 'Critical Need Language',
  },
  {
    code: 'C1',
    text: 'Critical Need Language 1st Tour Complete',
    seasons: [{ id: 185, season_text: null }],
    glossary_term: 'Critical Need Language 1st Tour Complete',
  },
  {
    code: 'CC',
    text: 'Critical Need Language Final Tour Complete',
    seasons: [{ id: 185, season_text: null }],
    glossary_term: 'Critical Need Language Final Tour Complete',
  },
  {
    code: 'R',
    text: 'Recommended for Tenure',
    seasons: [{ id: 185, season_text: null }],
    glossary_term: 'Recommended for Tenure',
  },
  {
    code: 'A',
    text: 'Ambassador or Deputy Assistant Secretary',
    seasons: [{ id: 185, season_text: null }],
    glossary_term: 'AMB Ambassador',
  },
  {
    code: 'F1',
    text: 'Pickering Fellows',
    seasons: [{ id: 185, season_text: null }],
    glossary_term: 'Pickering Fellows',
  },
  {
    code: 'F2',
    text: 'Rangel Fellows',
    seasons: [{ id: 185, season_text: null }],
    glossary_term: 'Rangel Fellows',
  },
  {
    code: 'P',
    text: 'Pickering/Rangel Fellows',
    seasons: [{ id: 185, season_text: null }],
    glossary_term: 'Pickering Fellow',
  },
];

export const Icons = {
  3: {
    isIcon: true,
    name: faSeedling,
    text: '3rd Tour',
    shortCode: '3TR',
  },
  4: {
    isIcon: true,
    name: faTree,
    text: 'Tenured',
    shortCode: 'TEN',
  },
  R: {
    isIcon: true,
    name: faRegistered,
    text: 'Recommended for Tenure',
    shortCode: 'REC',
  },
  6: {
    isIcon: true,
    name: faDiceSix,
    text: '6/8',
    shortCode: '6/8',
  },
  A: {
    isIcon: true,
    name: faChessQueen,
    text: 'Ambassador / Deputy Assistant Secretary',
    shortCode: 'AMB',
  },
  C: {
    isIcon: true,
    name: faLanguage,
    text: 'Critical Need Language',
    shortCode: 'CNL',
  },
  C1: {
    isIcon: true,
    name: faLanguage,
    text: 'Critical Need Language 1st Tour',
    shortCode: 'CL1',
  },
  CC: {
    isIcon: true,
    name: faLanguage,
    text: 'Critical Need Language Final Tour',
    shortCode: 'CLF',
  },
  D: {
    isIcon: true,
    name: faPercentage,
    text: 'Differential',
    shortCode: 'DIF',
  },
  F: {
    isIcon: true,
    name: faBalanceScaleLeft,
    text: 'Fair Share',
    shortCode: 'FAIR',
  },
  F1: {
    isIcon: true,
    name: faGraduationCap,
    text: 'Pickering Fellows',
    shortCode: 'PIK',
  },
  F2: {
    isIcon: true,
    name: faGraduationCap,
    text: 'Rangel Fellows',
    shortCode: 'RGL',
  },
  M: {
    isIcon: true,
    name: faMedal,
    text: 'Meritorious Step Increases',
    shortCode: 'MER',
  },
  P: {
    isIcon: true,
    name: faGraduationCap,
    text: 'Pickering/Rangel Fellows',
    shortCode: 'FEL',
  },
  T: {
    isIcon: true,
    name: faUserFriends,
    text: 'Tandem',
    shortCode: 'TAN',
  },
  8: {
    isIcon: true,
    name: faSpa,
    text: '8 Rule',
    shortCode: '8 Rule',
  },
};
