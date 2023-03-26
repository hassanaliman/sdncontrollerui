export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    //console.log(user);

    if (user && user.accessToken) {
        return { 
            'id': user.id,
            'x-access-token': user.accessToken };
    } else {
        return {};
    }
}