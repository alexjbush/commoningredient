export async function load({ locals }) {
    return {
        userPreference: locals.userPreference,
    };
}