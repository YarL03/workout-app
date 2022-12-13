export const cors = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'https://workout-app-beryl.vercel.app');
    res.set('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');

    next()
}