var utils = {

    //funzione che applica la funzione decodeURIcomponent
    //ad ognuno delle chiavi dell'oggetto ricevuto dalla
    //componente front-end
    decodeObj: async function (obj) {
        var obj_keys = Object.keys(obj);

        try {
            for await (const item of obj_keys) {

                obj[item] = decodeURIComponent(obj[item])

            }

        } catch (error) {

        }
        return new Promise((resolve, reject) => {

            resolve(obj)

        })

    },

    //funzione che assegna i valori delle chiavi dell'oggetto obj2
    //alle omologhe chiavi dell'oggetto obj1
    mergeObj: async function (obj1, obj2) {
        var obj_keys = Object.keys(obj1);
        try {
            for await (const item of obj_keys) {

                if (obj2.hasOwnProperty(item)) {
                    obj1[item] = obj2[item]
                }


            }


        } catch (error) {

        }
        return new Promise((resolve, reject) => {


            resolve(obj1)

        })



    },

    //funzione che verifica che le chiavi dell'oggetto ricevuto dalla
    //componente front-end siano anche chiavi dell'oggetto modello (rappresentante
    // le informazioni utente)
    validateUpdateInput: async function (obj, model) {


        var output = true;
        var obj_keys = Object.keys(obj);
        try {
            for await (const item of obj_keys) {

                if (!model.hasOwnProperty(item)) {

                    output = false
                } else {
                    if (obj[item] instanceof Object || obj[item] instanceof Array) {

                        output = false
                    }
                }

            }


        } catch (error) {

            output = false
        }
        return new Promise((resolve, reject) => {


            resolve(output)

        })




    },


    //funzione che verifica che le chiavi dell'oggetto ricevuto dalla
    //componente front-end siano tutte e sole chiavi dell'oggetto modello (rappresentante
    // le informazioni utente)
    validatePostInput: async function (obj, model) {


        var ops = [0, 1]
        var results = []
        var output = true


        for (var item of ops) {
            if (item == 0) {
                await utils.allObjKeysInModel(obj, model).then((res) => {

                    results[0] = res
                    return res
                })
            } else {
                await utils.allModelKeysInObj(obj, model).then((res) => {

                    results[1] = res
                    return res
                })
            }
        }

        return new Promise((resolve, reject) => {
            if (!results[0] || !results[1]) {
                output = false
            }

            resolve(output)
        })








    },



    allObjKeysInModel: async function (obj, model) {

        var output = true;
        var obj_keys = Object.keys(obj);
        try {
            for await (const item of obj_keys) {

                if (!model.hasOwnProperty(item)) {

                    output = false
                } else {
                    if (obj[item] === "") {

                        output = false
                    }
                }

            }


        } catch (error) {
            output = false
        }
        return new Promise((resolve, reject) => {


            resolve(output)

        })


    },

    allModelKeysInObj: async function (obj, model) {

        var output = true
        var model_keys = Object.keys(model);
        try {
            for await (const item of model_keys) {
                if (!obj.hasOwnProperty(item)) {

                    output = false
                } else {
                    if (obj[item] === "") {

                        output = false
                    }
                }
            }
        } catch (error) {
            output = false
        }

        return new Promise((resolve, reject) => {

            resolve(output)

        })






    }



}
module.exports = utils;



