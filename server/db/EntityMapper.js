

module.exports = class EntityMapper {

    constructor() {
        this.data = {};
    }

    getData() {
        return Object.values(this.data);
    }

    clear() {
        this.data = {};
    }

    parseRecord(i, record) {
        if (!this.data[record.get('n').properties.SPARK_ID]) {
            this.data[record.get('n').properties.SPARK_ID] = [];
            this.data[record.get('n').properties.SPARK_ID].push(record.get('n').properties);
        }
        this.data[record.get('n').properties.SPARK_ID].push(record.get('m').properties);

        /*this.data[record.get('n').properties.SPARK_ID] = {
            ...this.data[record.get('n').properties.SPARK_ID],
            ...record.get('n').properties,
            ...record.get('m').properties
        };*/
        console.log('end', this.data);
    }






}