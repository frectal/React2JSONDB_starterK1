export default class DataConvertor{
    static toObject(value){
        try{
            value = JSON.parse(value);
        } catch (e) {}

        if (Array.isArray(value)){
            let objArr = {};
            for (let i = 0; i < value.length; ++i){
                objArr[i] = value[i];
            }
            return objArr;
        }

        return value;

    }

    static toString(value){
        let shouldBeStringified = ['object', 'boolean'];
        if (shouldBeStringified.indexOf(typeof value) != -1){
            return JSON.stringify(value);
        }
        return value;
    }
}