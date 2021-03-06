function getImperialBonus(mastery) {
    let val = Math.floor(mastery/50);
    if (val > 40) val = 40;
    val = val.toString()
    const masteryTable = {
        "0": 0,
        "1": .0185, //50
        "2": .0296, //100
        "3": .0433, //150
        "4": .0595, //200
        "5": .0784, //250
        "6": .0999, //300
        "7": .1239, //350
        "8": .1505, //400
        "9": .1798, //450
        "10": .2166, //500
        "11": .2460, //550
        "12": .2830, //600
        "13": .3226, //650
        "14": .3648, //700
        "15": .4096, //750
        "16": .4570, //800
        "17": .5069, //850
        "18": .5595, //900
        "19": .6147, //950
        "20": .6724, //1000
        "21": .7327, //1050
        "22": .7957, //1100
        "23": .8612, //1150
        "24": .9293, //1200
        "25": .9584, //1250
        "26": .9880, //1300
        "27": 1.0181, //1350
        "28": 1.0486, //1400
        "29": 1.0795, //1450
        "30": 1.1109, //1500
        "31": 1.1428, //1550
        "32": 1.1751, //1600
        "33": 1.2078, //1650
        "34": 1.2410, //1700
        "35": 1.2746, //1750
        "36": 1.3087, //1800
        "37": 1.3444, //1850
        "38": 1.3783, //1900
        "39": 1.4137, //1950
        "40": 1.4496, //2000
    }
    return masteryTable[val]
}

export default getImperialBonus;