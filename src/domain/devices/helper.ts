// this._mPlotObjects = [];
//     for (let i = 0; i < values.length; i++) {
//       let color = UtilColor.COLOR_ARRAY[i%20];
//       this._mPlotObjects.push({
//         name: names[i],
//         color: color,
//         value: values[i],
//         colorClass: UtilColor.COLOR_CLASS[color]
//       });
//     }
import { ModelElasticEventHit } from '@/types/elastic/events/events';
import { ModelDeviceDetail, ModelDeviceLog } from '@/types/devices/models';
import { differenceInHours, format, parseISO } from 'date-fns';
import { ElasticConstants } from '@/data/elastic/elastic.constants';


const elasticEventHitToDevice = (stateList: (ModelElasticEventHit | undefined)[]): ModelDeviceDetail[] => {

    var mapped = stateList.map(item => {

        var date = item?._source.timestamp ? Date.parse(item?._source.timestamp) : undefined;
        var status = ElasticConstants.checks.device.stateInActive;
        if (date) {
          var currentDate = new Date(Date.now())
  
          var hours = differenceInHours( currentDate, date)
  
          console.log("  hours: ", hours, item?._source.device_id , item?._source.timestamp, currentDate.toISOString())
          if (hours <= ElasticConstants.checks.device.timeOffsetConnected) {
            status = ElasticConstants.checks.device.stateConnected;
          } else if (hours <= ElasticConstants.checks.device.timeOffsetActive) {
            status = ElasticConstants.checks.device.stateActive;
          }
        }
        return {
          id: item?._id ?? "",
          deviceId: item?._source.device_id ?? "",
          timestamp: item?._source.timestamp ? format(parseISO(item?._source.timestamp), "dd-MM-yyyy hh:mm") : format(Date.now(), "dd-MM-yyyy"),
          log: item?._source ?? {} as any,
          status:status
        }
      })

      return mapped

}



const elasticEventHitToDeviceLog = (stateList: (ModelElasticEventHit | undefined)[]): ModelDeviceLog[] => {

  var mapped = stateList.map(item => {

      var date = item?._source.timestamp ? parseISO(item?._source.timestamp) : undefined;
      var status = ElasticConstants.checks.device.stateInActive;
      if (date) {
        var currentDate = new Date(Date.now())

        var hours = differenceInHours( currentDate, date)

        console.log("hours: ", hours)
        if (hours < ElasticConstants.checks.device.timeOffsetConnected) {
          status = ElasticConstants.checks.device.stateConnected;
        } else if (hours < ElasticConstants.checks.device.timeOffsetActive) {
          status = ElasticConstants.checks.device.stateActive;
        }
      }

      var location = ""

      if(item?._source.location.coordinates){

        var coordinate = item?._source.location.coordinates

        if(coordinate.length>1){
          location = `lat: ${coordinate[0]}, lon: ${coordinate[1]}`
        }

      }
      return {
        id: item?._id ?? "",
        deviceId: item?._source.device_id ?? "",
        timestamp: item?._source.timestamp ? format(parseISO(item?._source.timestamp), "dd-MM-yyyy hh:mm") : format(Date.now(), "dd-MM-yyyy"),
        log: item?._source ?? {} as any,
        status:status,
        location: location,
        bouquet: item?._source.bouquet_name??""
      }
    })

    return mapped

}


export const DeviceHelper = {
    elasticEventHitToDevice: elasticEventHitToDevice,
    elasticEventHitToDeviceLog: elasticEventHitToDeviceLog
}