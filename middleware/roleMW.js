function roleMW(req, res, next) {
    const {body} = req
    const {user_type} = body.user_type

    if(user_type === "admin") {
        //THIS IS A WORK IN PROGRESS, WE ARE NOT SURE THIS IS THE BEST WAY. 
    }
}