const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const fs = require('fs');
const { encoding, decoding } = require("../../../config.json");

module.exports = {
  name: "오늘날씨",
  description: "오늘 날씨에 대해 가르쳐 줍니다",
  options: [
    {
      name: "지역",
      description: "<시/도>",
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "시",
      description: "<선택:시/구/군>",
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "동",
      description: "<선택:읍/면/동>",
      type: ApplicationCommandOptionType.String,
    },
  ],

  callback: async (args, interaction) => {

    const date = new Date();
    let tiem = 0200;
    const nowyear = date.getFullYear()
    const nowmonth = ("0" + (date.getMonth() + 1)).slice(-2);
    const nowdate = ("0" + date.getDate()).slice(-2);
    const format = nowyear+""+nowmonth+""+nowdate;
    let request = require("request");
    let url =
      "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
      var queryParams = '?' + encodeURIComponent('ServiceKey') + encoding;
    queryParams +=
      "&" + encodeURIComponent("dataType") + "=" + encodeURIComponent("JSON");
    if (date.getHours() > 1) {
      time = "0200";
      if (date.getHours() > 4) {
        time = "0500";
        if (date.getHours() > 7) {
          time = "0800";
          if (date.getHours() > 10) {
            time = "1100";
            if (date.getHours() > 13) {
              time = "1400";
              if (date.getHours() > 16) {
                time = "1700";
                if (date.getHours() > 19) {
                  time = "2000";
                  if (date.getHours() > 22) {
                    time = "2300";
                  }
                }
              }
            }
          }
        }
      }
    }


    const embed = new EmbedBuilder()
    .setTitle(":hammer: 올바른 시 또는 도를 입력해 주세요  :hammer:")
    .setDescription(" ")
    .setColor("Random")
    .addFields({
      name: "사용법",
      value: "/오늘날씨 <시/도> <선택:시/도/군> <선택:읍/면/동>",
      inline: true,
    });

  const areas = interaction.options.get("지역");
  let area = interaction.options.get("지역")?.value;
  let city = interaction.options.get("시")?.value;
  let dong = interaction.options.get("동")?.value;
  console.log(dong)

  await interaction.deferReply();

  if(areas === null) {
    await interaction.editReply({ embeds: [embed] })
  }

    fs.readFile("Data.json", 'utf-8', function (err, result) {
      const json = JSON.parse(result);
      let typeA = false;
      let typeB = false;
      for(let i = 0; i<json.length; i++){
        if(json[i][0].indexOf(area) !== -1){
            if(city === null && dong === null){
                if(json[i][1] === "" && json[i][2] === ""){
                    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
                    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('30'); /* */
                    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(format); /* */
                    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(time); /* */
                    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(json[i][3]); /* */
                    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(json[i][4]); /* */
                    area = json[i][0];
                    city = "";
                    break
                }
            }else if(city != null){
                if(dong != null){
                    if(json[i][1].indexOf(city) !== -1){
                        if(json[i][2].indexOf(dong) !== -1){
                            typeA = true;
                            typeB = true;
                            queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
                            queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('30'); /* */
                            queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(format); /* */
                            queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(time); /* */
                            queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(json[i][3]); /* */
                            queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(json[i][4]); /* */
                            area = json[i][0];
                            city = json[i][1];
                            dong = json[i][2];
                            console.log(dong)
                            break
                        }
                    }
                }else{
                    if(json[i][1].indexOf(city) !== -1){
                        typeA = true;
                        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
                        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('30'); /* */
                        queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(format); /* */
                        queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(time); /* */
                        queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(json[i][3]); /* */
                        queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(json[i][4]); /* */
                        area = json[i][0];
                        city = json[i][1];
                        break
                    }
                }
            }
        }
    }

      request(
        {
          url: url + queryParams,
          method: "GET",
        },
        async function (error, response, body) {
          const empty = new EmbedBuilder()
            .setTitle(":no_entry:  오류  :no_entry:")
            .setDescription(
              "알 수 없는 시/도 또는 시/구/군 또는  읍/면/동 입니다"
            )
            .setColor("#FF007F");

            const jsonData = JSON.parse(body);
            console.log(body)
          if (jsonData.response.header.resultCode === "01") {
            await interaction.editReply({ embeds: [empty] });
          }
          
          let SKY = "";
          let REH = "";
          let TMN = "";
          let TMX = "";
          let PTY = "";
          let POP = false;
          for (let x = 0; x < jsonData.response.body.items.item.length; x++) {
            switch (jsonData.response.body.items.item[x].category) {
              case "SKY":
                switch (jsonData.response.body.items.item[x].fcstValue) {
                  case "1":
                    SKY = "오늘은 구름 하나 없이 좋은 날~";
                    break
                  case "3":
                    SKY = "오늘은 구름이 조금 많은 날 ㅜ";
                    break
                  case "4":
                    SKY = "오늘은 흐림..";
                    break
                }
                break;
                case "REH":
                  REH = jsonData.response.body.items.item[x].fcstValue
                  break
              case "TMN":
                  TMN = jsonData.response.body.items.item[x].fcstValue+"℃"
                  break
              case "TMX":
                  TMX = jsonData.response.body.items.item[x].fcstValue+"℃"
                  break
              case "PTY":
                switch(jsonData.response.body.items.item[x].fcstValue){
                  case "1":
                      PTY = "오늘은 비가 내릴 수도 있어요, 외출시 우산을 챙겨야겠네요."
                      break
                  case "2":
                      PTY = "오늘은 비와 눈이 섞여서 올 수 있어요, 외출시 우산을 챙겨야겠네요."
                      break
                  case "3":
                      PTY = "오늘은 새하얀 눈이 내릴 예정이에요"
                      break
                  case "4":
                      PTY = "오늘은 소나기가 내릴 예정이에요, 외출 시 우산을 꼭 챙겨야겠어요."
                      break
                  case "5":
                      PTY = "오늘은 빗방울이 조금씩 내릴 에정이에요, 외출 시 우산을 챙겨야겠어요."
                      break
                  case "6":
                      PTY = "오늘은 빗방울이나 눈이 조금씩 날릴 예정이에요"
                      break
                  case "7":
                      PTY = "오늘은 눈이 조금씩 날릴 예정이에요"
                      break
              }
                break
              case "POP":
                if (jsonData.response.body.items.item[x].fcstValue === "0") {
                  POP = false;
                } else {
                  POP = true;
                }
                break
            }
          }
          if (REH === "") {
            REH = "조회된 데이터가 없습니다";
          }
          if (TMN === "") {
            TMN = "조회된 데이터가 없습니다";
          }
          if (TMX === "") {
            TMX = "조회된 데이터가 없습니다";
          }
          if (PTY === "") {
            PTY = "조회된 데이터가 없습니다";
          }
          if (SKY === "") {
            SKY = "조회된 데이터가 없습니다."
          }

          let todayEmbed = new EmbedBuilder()
            .setTitle("오늘의 날씨").setColor("#83ff88");
            
          if (POP) {
            if (!typeA && !typeB) {

              todayEmbed.addFields(
                {
                  name: "오늘의 하늘",
                  value: SKY,
                  inline: true,
                },
                { name: "오늘의 습도", value: REH + "%" },
                {
                  name: "아침 최저기온", value: TMX
                },
                {name:"오늘의 강수 형태", value:PTY}
              ).setDescription(area+"의 ");

            }else if(typeA){

              todayEmbed.addFields(
                    {
                      name: "오늘의 하늘",
                      value: SKY,
                      inline: true,
                    },
                    { name: "오늘의 습도", value: REH + "%" },
                    {
                      name: "아침 최저기온", value: TMX
                    },
                    {name:"오늘의 강수 형태", value:PTY}
                  ).setDescription(area+" "+city+"의 ");

            }else if(typeA && typeB){

              todayEmbed.addFields(
                    {
                      name: "오늘의 하늘",
                      value: SKY,
                      inline: true,
                    },
                    { name: "오늘의 습도", value: REH + "%" },
                    {
                      name: "아침 최저기온", value: TMX
                    },
                    {name:"오늘의 강수 형태", value:PTY}
                  ).setDescription(area+" "+city+" "+dong+"의 ");

            }
          }else{
            if (!typeA && !typeB) {

              todayEmbed.addFields(
                  {
                    name: "오늘의 하늘",
                    value: SKY,
                    inline: true,
                  },
                  { name: "오늘의 습도", value: REH + "%" },
                  {
                    name: "아침 최저기온", value: TMX
                  },
                ).setDescription(area+"의 ");

              }else if(typeA){

                todayEmbed.addFields(
                      {
                        name: "오늘의 하늘",
                        value: SKY,
                        inline: true,
                      },
                      { name: "오늘의 습도", value: REH + "%" },
                      {
                        name: "아침 최저기온", value: TMX
                      },
                    ).setDescription(area+" "+city+"의 ");

              }else if(typeA && typeB){

                todayEmbed.addFields(
                      {
                        name: "오늘의 하늘",
                        value: SKY,
                        inline: true,
                      },
                      { name: "오늘의 습도", value: REH + "%" },
                      {
                        name: "아침 최저기온", value: TMX
                      },
                    ).setDescription(area+" "+city+" "+dong+"의 ");

              }
          }
          await interaction.editReply({ embeds: [todayEmbed] });
        });
    
    });//파일 읽기

  }, //종료
};
