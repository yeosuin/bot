const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "오늘날씨",
  description: "오늘 날씨에 대해 가르쳐 줍니다",
  options: [
    {
      name: "지역",
      description: "지역을 골라",
      type: ApplicationCommandOptionType.String,
    },
  ],

  callback: async (args, interaction) => {
    const fs = require("fs");

    const date = new Date();
    let tiem = 0200;
    const nowyear = date.getFullYear();
    const nowmonth = date.getMonth();
    const nowdate = date.getDate();
    const format = nowyear + "" + nowmonth + "" + nowdate;
    var request = require("request");

    var url =
      "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
    var queryParams =
      "?" +
      encodeURIComponent("serviceKey") +
      "=DiKlE43jSXB%2BKoUPcwzX2M%2Fykd0T991LJW5e1FTvx%2FcMkoPllMTg0PzpXI7GaioLiJUNcQF6O2f7ZCcNsf7HSw%3D%3D"; /* Service Key*/
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

    const area = interaction.options.get();

    await interaction.deferReply();
    if(area === null)interaction.editReply({ embeds: [embed] });

    console.log(`${area}${interaction.options}`);
    // fs.readFile('../../../Data.json',function(err,result) {
    //   const json = JSON.parse(result)
    //   let typeA = false;
    //   let typeB = false;
    //   for(let i=0; i<json.length; i++) {
    //     if(args[0] === json[i][0]) {
    //       if(args);
    //     }
    //   }
    // });
  },
};
