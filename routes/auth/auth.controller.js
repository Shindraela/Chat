/*
Import
*/
    const UserModel = require('../../models/user.model');
    const bcrypt = require('bcryptjs');
//

/*
Functions
*/
    const register = body => {
        // Search for user
        return new Promise( (resolve, reject) => {

            UserModel.findOne({ email: body.email }, (error, user) => {
                if(error){ // Mongo Error
                    return reject(error)
                }
                else if(user){ // User already exist
                    return reject(user)
                }
                else{ // Register new user
                    // Crypt password
                    bcrypt.hash(body.password, 10)
                    .then( hashedPassword => {
                        console.log(hashedPassword)
                        // Replace clear password
                        body.password = hashedPassword;

                        // Save user
                        UserModel.create(body, (error, newUser) => {
                            if(error){ // Mongo error
                                return reject(error)
                            }
                            else{ // User registrated
                                return resolve(newUser);
                            };
                        });
                    })
                    .catch( hashError => {
                        console.log('error', hashError)
                        return reject(hashError);
                    });
                };
            });
        });
    };

    const login = body => {
        return new Promise( (resolve, reject ) => {

            UserModel.findOne( { email: body.email }, (error, user) => {
                if(error) reject(error)
                else if( !user ) reject('User not found')
                else{
                    // Check password
                    const validPassword = bcrypt.compareSync( body.password, user.password )

                    if( !validPassword ) reject('Password not valid')
                    else resolve({
                        user: user,
                        token: user.generateJwt()
                    })
                }
            })
            
        })
    };

    const createMessage = body => {
        return new Promise( (resolve, reject ) => {

            UserModel.findOne( { email: body.email }, (error, user) => {
                if(error) reject(error)
                else if( !user ) reject('User not found')
                else{
                    // Check password
                    const validPassword = bcrypt.compareSync( body.password, user.password )

                    if( !validPassword ) reject('Password not valid')
                    else resolve({
                        user: user,
                        token: user.generateJwt()
                    })
                }
            })
            
        })
    };

    const updateMessage = body => {
        return new Promise( (resolve, reject ) => {

            UserModel.findOne( { email: body.email }, (error, user) => {
                if(error) reject(error)
                else if( !user ) reject('User not found')
                else{
                    // Check password
                    const validPassword = bcrypt.compareSync( body.password, user.password )

                    if( !validPassword ) reject('Password not valid')
                    else resolve({
                        user: user,
                        token: user.generateJwt()
                    })
                }
            })
            
        })
    };

    const deleteMessage = body => {
        return new Promise( (resolve, reject ) => {

            UserModel.findOne( { email: body.email }, (error, user) => {
                if(error) reject(error)
                else if( !user ) reject('User not found')
                else{
                    // Check password
                    const validPassword = bcrypt.compareSync( body.password, user.password )

                    if( !validPassword ) reject('Password not valid')
                    else resolve({
                        user: user,
                        token: user.generateJwt()
                    })
                }
            })
            
        })
    };
//

/*
Export
*/
    module.exports = {
        register,
        login,
        createMessage,
        updateMessage,
        deleteMessage
    }
//