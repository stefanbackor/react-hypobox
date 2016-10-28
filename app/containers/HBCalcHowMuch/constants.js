/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const ADD_PERIOD = 'boilerplate/HBCalcHowMuch/ADD_PERIOD';
export const REMOVE_PERIOD = 'boilerplate/HBCalcHowMuch/REMOVE_PERIOD';
export const PERIOD_FORM_CHANGED = 'boilerplate/HBCalcHowMuch/PERIOD_FORM_CHANGED';
