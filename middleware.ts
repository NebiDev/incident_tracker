export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/incidents/new',
        "/incidents/:id+/edit",
    ]
}