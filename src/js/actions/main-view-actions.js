export const CHANGE_MAIN_VIEW = 'main-view:change';

export function changeMainView (view)
{
    return {
        type: CHANGE_MAIN_VIEW,
        payload: {
            view: view
        }
    }
}
