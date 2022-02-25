/*
This js file define the login popup, topbar appear, check frieghter install
*/

IS_DEBUG = false;
if (IS_DEBUG) {
    SEVER_URL = "https://horizon-testnet.stellar.org";
    NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;
    NETWORK_TEXT = "TESTNET";
} else {
    SEVER_URL = "https://horizon.stellar.org";
    NETWORK_PASSPHRASE = StellarSdk.Networks.PUBLIC;
    NETWORK_TEXT = "PUBLIC";
}
STELLAR_SERVER = new StellarSdk.Server(SEVER_URL);

MVT = new StellarSdk.Asset("MVT", "GDPTX2Z3HTJKCHTT5JHCL7M5MD7P2HVV7QUDCTBIHW2BYLO3XR4VSRSA");
TESTVOTE = new StellarSdk.Asset("TESTVOTE", "GDPTX2Z3HTJKCHTT5JHCL7M5MD7P2HVV7QUDCTBIHW2BYLO3XR4VSRSA");

XLM = new StellarSdk.Asset.native();
yXLM = new StellarSdk.Asset("yXLM", "GARDNV3Q7YGT4AKSDF25LT32YSCCW4EV22Y2TV3I2PU2MMXJTEDL5T55");
USDC = new StellarSdk.Asset("USDC", "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN");
LSP = new StellarSdk.Asset("LSP", "GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK");
AQUA = new StellarSdk.Asset("AQUA", "GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA");
BTC = new StellarSdk.Asset("BTC", "GDPJALI4AZKUU2W426U5WKMAT6CN3AJRPIIRYR2YM54TL2GDWO5O2MZM");
ETH = new StellarSdk.Asset("ETH", "GBFXOHVAS43OIWNIO7XLRJAHT3BICFEIKOJLZVXNT572MISM4CMGSOCC");
PYBC = new StellarSdk.Asset("PYBC", "GBVB43NLVIP2USHXSKI7QQCZKZU2Z6U6A5PAHMIW7LLNVMQJTOX2BZI5");

XLM_MVT_VOTE = StellarSdk.Keypair.fromPublicKey("GDE5UPEZB63KPP7VVJW3MSVMFT4Z6ATAMDZISWOPRD36D2FOOSSGEHJR");
MVT_USDC_VOTE = StellarSdk.Keypair.fromPublicKey("GCP3QE6QZLBBCC7I526POQUKEGZUPDKN24J52AGW2IL3BU6IT2OABWGF");
MVT_yXLM_VOTE = StellarSdk.Keypair.fromPublicKey("GBK2LJBQUZOGRM3SVGHRRY5P7QFSN635HNQZJQSHNJIRS4GQYXJ6LBRG");
AQUA_MVT_VOTE = StellarSdk.Keypair.fromPublicKey("GCTOZAS33DTMEPQ6K4CCG5LKYV73FKDAZPTJ23Q53MY65BV3LRK7U6TS");
LSP_MVT_VOTE = StellarSdk.Keypair.fromPublicKey("GD5FVR34DDOGAKB7QM4PBMH6HWWZ6YZJAXO5ZFQ6NQ5OPAUQEO6H3U47");
MVT_PYBC_VOTE = StellarSdk.Keypair.fromPublicKey("GAGM3GI24FEYNQ6LD62U4LFPXPIOBSQL6QASDXTR6BHJ4EYIX5BDSMCS");
BTC_MVT_VOTE = StellarSdk.Keypair.fromPublicKey("GCKUUBESSY7SC7G4JEFANHFUKK4XSQ32DOHTQFLAAPPULSMMGZDZZG7V");
ETH_MVT_VOTE = StellarSdk.Keypair.fromPublicKey("GA4OYMGT7VEHVIXJADAANUFDPXETH5BUHHLMR6TEJPLLZ4EYX457GAGU");

XLM_MVT_POOL = new StellarSdk.LiquidityPoolAsset(XLM, MVT, 30);
MVT_USDC_POOL = new StellarSdk.LiquidityPoolAsset(MVT, USDC, 30);
MVT_yXLM_POOL = new StellarSdk.LiquidityPoolAsset(MVT, yXLM, 30);
AQUA_MVT_POOL = new StellarSdk.LiquidityPoolAsset(AQUA, MVT, 30);
LSP_MVT_POOL = new StellarSdk.LiquidityPoolAsset(LSP, MVT, 30);
MVT_PYBC_POOL = new StellarSdk.LiquidityPoolAsset(MVT, PYBC, 30);
BTC_MVT_POOL = new StellarSdk.LiquidityPoolAsset(BTC, MVT, 30);
ETH_MVT_POOL = new StellarSdk.LiquidityPoolAsset(ETH, MVT, 30);

XLM_MVT_BURN  = StellarSdk.Keypair.fromPublicKey('GCSJUSJWBSH7NW6HJMFOWQMJXECRVI4JXCCCMYEA5TS6SC625BOFN7CF');
MVT_USDC_BURN = StellarSdk.Keypair.fromPublicKey('GCLZZAN6SUM4WAZXLSUS65QN23FXMB7IY6TO2FG2SB3MPUL3D3O6KUGG');
MVT_yXLM_BURN = StellarSdk.Keypair.fromPublicKey('GCGP7YS75XXAD6FIFO6EZR2FDDDDLYPT4PNFGBGVE37ZVVSCDZ3QDPEI');
AQUA_MVT_BURN = StellarSdk.Keypair.fromPublicKey('GCDWMVJKWC6B3QSPKL2O4YPZYB4ULE34XRLAAQGVQU5GL44ZCVM2PQWP');
LSP_MVT_BURN  = StellarSdk.Keypair.fromPublicKey('GD7WM5PLNKVM4EZPXKF6I3XEMUMRZJTZVYH5ZJFLP4GDZRJEE66MUDKC');
MVT_PYBC_BURN = StellarSdk.Keypair.fromPublicKey('GBCFFN3COAQO23YFUFAM26K6H625YEYYJTKUDLC6FATDYXFOIX4K3WOO');
BTC_MVT_BURN  = StellarSdk.Keypair.fromPublicKey('GBJV575LXINH6WXB4VREFF2KGDFG4Q4P2TZB7AXJRZZURXOYNCWLOJUL');
ETH_MVT_BURN  = StellarSdk.Keypair.fromPublicKey('GB7OBJWXMM44SG6JBUDIVIONJF3OZ4EKPPL3YJIIUDZHOZNO7QOZTVSF');

CURRENT_LOGIN_METHOD = 0;
CURRENT_USER_ACCOUNT = "";

PAIRS_LIST = [
    {'VOTE': XLM_MVT_VOTE, 'POOL': XLM_MVT_POOL, 'BURN': XLM_MVT_BURN},
    {'VOTE': MVT_USDC_VOTE, 'POOL': MVT_USDC_POOL, 'BURN': MVT_USDC_BURN},
    {'VOTE': MVT_yXLM_VOTE, 'POOL': MVT_yXLM_POOL, 'BURN': MVT_yXLM_BURN},
    {'VOTE': AQUA_MVT_VOTE, 'POOL': AQUA_MVT_POOL, 'BURN': AQUA_MVT_BURN},
    {'VOTE': LSP_MVT_VOTE, 'POOL': LSP_MVT_POOL, 'BURN': LSP_MVT_BURN},
    {'VOTE': MVT_PYBC_VOTE, 'POOL': MVT_PYBC_POOL, 'BURN': MVT_PYBC_BURN},
    {'VOTE': BTC_MVT_VOTE, 'POOL': BTC_MVT_POOL, 'BURN': BTC_MVT_BURN},
    {'VOTE': ETH_MVT_VOTE, 'POOL': ETH_MVT_POOL, 'BURN': ETH_MVT_BURN},
];

NAME_INDEX_DICT = {
    'XLM_MVOTE': 0,
    'MVOTE_USDC': 1,
    'MVOTE_yXLM': 2,
    'AQUA_MVOTE': 3,
    'LSP_MVOTE': 4,
    'MVOTE_PYBC': 5,
    'BTC_MVOTE': 6,
    'ETH_MVOTE': 7,
};

PAIR_NUMBER = 8;

var mvoteIntervalId;
var clockIntervalId;


function clock() {
    let timeStamp = Number(1000*10*60);
    let before = new Date().getTime();
    const clockInterval = setInterval(function() {
        var now = new Date().getTime();
        var distance = now - before;
        if (distance > timeStamp) {
            clearInterval(clockInterval);
            console.log(`clock time is up`);
        } else if(distance >= (9000*60)) {
            console.log(`last update 9 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '9 minutes ago';
        } else if(distance >= (8000*60)) {
            console.log(`last update 8 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '8 minutes ago';
        } else if(distance >= (7000*60)) {
            console.log(`last update 7 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '7 minutes ago';
        } else if(distance >= (6000*60)) {
            console.log(`last update 6 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '6 minutes ago';
        } else if(distance >= (5000*60)) {
            console.log(`last update 5 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '5 minutes ago';
        } else if(distance >= (4000*60)) {
            console.log(`last update 4 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '4 minutes ago';
        } else if(distance >= (3000*60)) {
            console.log(`last update 3 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '3 minutes ago';
        } else if(distance >= (2000*60)) {
            console.log(`last update 2 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '2 minutes ago';
        } else if(distance >= (1000*60)) {
            console.log(`last update 1 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '1 minute ago';
        } else if(distance >= (0)) {
            console.log(`last update 0 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = 'just now';
        }
    }, 1000);
    return clockInterval;
}

function popup_login() {
    login_toggle();
    document.querySelector("body").style.overflow = 'hidden';  //prevent page scrolling
}

function close_login() {
    login_toggle();
    document.querySelector("body").style.overflow = 'scroll';  //reset page scrolling
}

function login_toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup_login = document.getElementById('signupModal');
    popup_login.classList.toggle('active');
}

function popup_public() {
    var popup_login = document.getElementById('signupModal');
    popup_login.classList.toggle('active');
    var popup_public = document.getElementById('signupModal_public');
    popup_public.classList.toggle('active');
    document.querySelector("body").style.overflow = 'hidden';  //prevent page scrolling
    document.getElementsByClassName('public_input_value')[0].value = "";
}

function close_public() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup_public = document.getElementById('signupModal_public');
    popup_public.classList.toggle('active');
    document.querySelector("body").style.overflow = 'scroll';  //reset page scrolling
}

function popup_burn(pair) {
    document.getElementById('signupModal_burn').classList.add(pair);
    let imageNames = pair.split('_');
    // console.log(imageNames.length, imageNames);
    for(let i = 0; i < imageNames.length; i++)
    {   
        let tmpIdName = 'burn-pair-image-'+(i+1).toString();
        let tmpPairName = 'pair-ctn-desp-'+(i+1).toString();
        switch (imageNames[i])
        {
            case "XLM":
                document.getElementById(tmpIdName).src = "https://dynamic-assets.coinbase.com/ddaf9d27a2388105c5568c68ebe4078d057efac1cb9b091af6a57f4d187cf06b2701b95f75bd148d3872df32b69ebb678de71a42da317370aaec7d6448bda379/asset_icons/80782fe2d690f299e7f5bb9b89af87e1db75769e59c14fa0257054c962401805.png";
                document.getElementById(tmpPairName).innerHTML = "XLM";
                break;
            case "MVOTE":
                document.getElementById(tmpIdName).src = "./icons/MVOTEicon.png";
                document.getElementById(tmpPairName).innerHTML = "MVOTE";
                break;
            case "USDC":
                document.getElementById(tmpIdName).src = "https://www.centre.io/images/usdc/usdc-icon-86074d9d49.png";
                document.getElementById(tmpPairName).innerHTML = "USDC";
                break;
            case "yXLM":
                document.getElementById(tmpIdName).src="https://ultrastellar.com/static/images/icons/yXLM.png";
                document.getElementById(tmpPairName).innerHTML = "yXLM";
                break;
            case "AQUA":
                document.getElementById(tmpIdName).src="https://aqua.network/assets/img/aqua-logo.png";
                document.getElementById(tmpPairName).innerHTML = "AQUA";
                break;
            case "LSP":
                document.getElementById(tmpIdName).src="https://lumenswap.io/favicon.ico";
                document.getElementById(tmpPairName).innerHTML = "LSP";
                break;
            case "PYBC":
                document.getElementById(tmpIdName).src="https://luxpayband.io/img/LXLogo.png";
                document.getElementById(tmpPairName).innerHTML = "PYBC";
                break;
            case "BTC":
                document.getElementById(tmpIdName).src="https://static.ultrastellar.com/media/assets/img/c3380651-52e5-4054-9121-a438c60a1ec4.png";
                document.getElementById(tmpPairName).innerHTML = "BTC";
                break;
            case "ETH":
                document.getElementById(tmpIdName).src="https://static.ultrastellar.com/media/assets/img/f50535aa-8fcb-487f-912f-96d338b8e610.png";
                document.getElementById(tmpPairName).innerHTML = "ETH";
                break;
            default:
                alert('image load wrong');
                break;
        }  
    }
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup_bn = document.getElementById('signupModal_burn');
    popup_bn.classList.toggle('active');
    var userBalance = checkTrustline();
    if(userBalance >= 0){
        document.getElementsByClassName('title-tip-span')[0].classList.remove('active');
        document.getElementsByClassName('title-tip-span')[1].classList.add('active');
        document.getElementsByClassName('title-tip-span-text')[0].innerHTML = userBalance.toString();
    } 
}

function close_burn() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup_bn = document.getElementById('signupModal_burn');
    popup_bn.classList.toggle('active');
    document.getElementsByClassName('pair_input_value')[0].value = "0";
    document.getElementsByClassName('balance-num')[0].innerHTML = "0";
    document.getElementsByClassName('stellar_copy_link')[0].classList.remove('active');
    document.getElementsByClassName('burn-submit-btn')[0].style.pointerEvents = 'auto';
    document.getElementsByClassName('title-tip-span')[0].classList.add('active');
    document.getElementsByClassName('title-tip-span')[1].classList.remove('active');
}

function reset_burn_num() {
    document.getElementsByClassName('pair_input_value')[0].value = "0";
}

function burn_keyup(input) {
    let tmp = input.toString().replace(/^0+/, '');
    console.log(`tmp:`, tmp);
    document.getElementsByClassName('pair_input_value')[0].value = input.toString().replace(/^0+/, '');
}

function change_burn_num(value) {
    document.getElementsByClassName('balance-num')[0].innerHTML = value;
}

function toggle_login_arrow() {
    document.getElementsByClassName('menu-login-arrow')[0].classList.toggle('active');
}

function toggle_logout() {
    document.getElementsByClassName('menu-user')[0].classList.toggle('active');
    document.getElementById('login-arrow-down').classList.toggle('active');
    document.getElementById('login-arrow-up').classList.toggle('active');
}

function logout() {
    document.getElementsByClassName('login_button')[0].innerHTML = 'Connect Wallet';
    CURRENT_LOGIN_METHOD = 0;
    for (let i = 0; i < PAIR_NUMBER; i++) {
        document.getElementsByClassName('lock_num')[i].innerHTML = "NA";
        document.getElementsByClassName('lp_num')[i].innerHTML = "NA";
        document.getElementsByClassName('mvote_num')[i].innerHTML = "NA";
        document.getElementsByClassName('your_num')[i].innerHTML = "NA";
        document.getElementsByClassName('burn_num_1')[i].innerHTML = 0;
    }
    CURRENT_USER_ACCOUNT = "";
    CURRENT_LOGIN_METHOD = 0;
    toggle_login_arrow();
    toggle_logout();
    check_login();
}

function check_login() {
    if(CURRENT_LOGIN_METHOD !== 0){
        console.log(`login success`);
        document.getElementsByClassName('menu-login-btn')[0].style.pointerEvents = 'none';
        clockIntervalId = clock(); // first start
        mvoteIntervalId = setInterval(()=> {clockIntervalId = clock()}, 1000*10*60);
        test();
    }
    else {
        console.log(`login fail`);
        document.getElementsByClassName('menu-login-btn')[0].style.pointerEvents = 'auto';
        clearInterval(mvoteIntervalId);
        clearInterval(clockIntervalId);
    }
}

async function publickey_login() {
    close_public();
    var userPublicKey = document.getElementsByClassName('public_input_value')[0].value;
    await STELLAR_SERVER.loadAccount(userPublicKey)
        .then((Account) => {
            console.log(Account.accountId());
            CURRENT_USER_ACCOUNT = Account;
            document.getElementsByClassName('login_button')[0].innerHTML = Account.accountId().slice(0, 4) + '...' + Account.accountId().slice(-4);
            document.getElementsByClassName('menu-login-btn')[0].setAttribute("pointer-events", "none");
            toggle_login_arrow();
            CURRENT_LOGIN_METHOD = 2;
        })
        .catch((e) => {
            console.log(`This account is INVALID!`);
            console.error(e);
        });

    check_login();
}

async function freight_login() {
    close_login();

    if (window.freighterApi.isConnected()) {
        try {
            var userPublicKey = await window.freighterApi.getPublicKey();
            var userNetwork = await window.freighterApi.getNetwork();
        } catch (e) {
            console.log(`Error ${e} in retrievePublicKey() or retrieveNetwork().`);
            return 0;
        }
        console.log(`User is using Freighter with publickey: ${userPublicKey} and network: ${userNetwork}`);

        if (userNetwork !== NETWORK_TEXT) {
            alert(`Please switch to ${NETWORK_TEXT} Network in Freighter and try again!`);
        } else {
            await STELLAR_SERVER.loadAccount(userPublicKey)
                .then((Account) => {
                    console.log(Account.accountId());
                    CURRENT_USER_ACCOUNT = Account;
                    document.getElementsByClassName('login_button')[0].innerHTML = Account.accountId().slice(0, 4) + '...' + Account.accountId().slice(-4);
                    document.getElementsByClassName('menu-login-btn')[0].setAttribute("pointer-events", "none");
                    toggle_login_arrow();
                    CURRENT_LOGIN_METHOD = 1;
                })
                .catch((e) => {
                    console.log(`This account is INVALID!`);
                    console.error(e);
                });
        }
    } else {
        alert(`Please download the Freighter extension first!`);
    }
    check_login();
}

async function getAquaVote(pairIndex, voteAsset=AQUA, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }

    var voteKeypair = PAIRS_LIST[pairIndex]['VOTE'];

    var cursor = "";
    var records = [];

    while (true) {
        try {
            var response = await server
                .claimableBalances()
                .claimant(voteKeypair.publicKey())
                .asset(voteAsset)
                .cursor(cursor)
                .limit(200)
                .call();
        } catch (e) {
            console.log(`Error ${e} in getAquaVote().`);
            return 0;
        }

        var recordList = response['records'];

        if (recordList.length > 0) {
            records.push.apply(records, recordList);
            var nextCursor = recordList[recordList.length - 1]['paging_token'];
            if (cursor !== nextCursor) {
                cursor = nextCursor;
                // console.log(`Get cursor: ${cursor}.`);
            } else {
                // console.log(`All votes are retrieved.`);
                break;
            }
        } else {
            // console.log(`All votes are retrieved.`);
            break;
        }
    }

    var userAmount = 0;
    var totalAmount = 0;
    for (var recordIndex in records) {
        var voteAmount = parseFloat(records[recordIndex]['amount']);
        var claimantAccount = records[recordIndex]['claimants'][1]['destination'];
        if (claimantAccount === userAccount.accountId()) {
            userAmount = userAmount + voteAmount;
        }
        totalAmount = totalAmount + voteAmount;
    }
    console.log(`${records.length} votes in total, ${userAmount}/${totalAmount}`);
    document.getElementsByClassName('lock_num')[pairIndex].innerHTML = (userAmount * 100/ totalAmount).toFixed(4) + '%';
    return {'userAmount': userAmount, 'totalAmount': totalAmount};
}

async function getLPShare(pairIndex, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }

    var LPAsset = PAIRS_LIST[pairIndex]['POOL'];

    var totalAmount = 0;
    var userAmount = 0;

    var poolId = LPAsset.toString().split('liquidity_pool:')[1];

    try {
        var response = await server
            .liquidityPools()
            .liquidityPoolId(poolId)
            .call();
    } catch (e) {
        console.log(`Error ${e} in getLPShare().`);
        return 0;
    }

    totalAmount = parseFloat(response['total_shares']);

    var userBalances = userAccount['balances'];
    for (var bIndex in userBalances) {
        if (userBalances[bIndex]['asset_type'] === "liquidity_pool_shares") {
            if (userBalances[bIndex]['liquidity_pool_id'] === poolId) {
                userAmount = parseFloat(userBalances[bIndex]['balance']);
                break;
            }
        }
    }
    console.log(`${userAmount}/${totalAmount}`);
    document.getElementsByClassName('lp_num')[pairIndex].innerHTML = (userAmount * 100/ totalAmount).toFixed(4) + '%';
    return {'userAmount': userAmount, 'totalAmount': totalAmount};
}

async function getMVoteBurn(pairIndex, burnAsset=MVT, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }

    var burnAccount = PAIRS_LIST[pairIndex]['BURN'];

    var cursor = "";
    var records = [];

    while (true) {
        try{
            var response = await server
                .payments()
                .forAccount(burnAccount.publicKey())
                .cursor(cursor)
                .limit(200)
                .call();
        } catch (e) {
            console.log(`Error ${e} in getMVoteBurn().`);
            return 0;
        }

        var recordList = response['records'];

        if (recordList.length > 0) {
            records.push.apply(records, recordList);
            var nextCursor = recordList[recordList.length - 1]['paging_token'];
            if (cursor !== nextCursor) {
                cursor = nextCursor;
                // console.log(`Get cursor: ${cursor}.`);
            } else {
                // console.log(`All payments are retrieved.`);
                break;
            }
        } else {
            // console.log(`All payments are retrieved.`);
            break;
        }
    }

    var userAmount = 0;
    var totalAmount = 0;
    for (var recordIndex in records) {
        if (records[recordIndex]['type'] === "payment" &&
            records[recordIndex]['asset_type'] !== "native" &&
            records[recordIndex]['asset_code'] === burnAsset.getCode() &&
            records[recordIndex]['asset_issuer'] === burnAsset.getIssuer()) {
            var burnAmount = parseFloat(records[recordIndex]['amount']);
            var fromAccount = records[recordIndex]['from'];
            if (fromAccount === userAccount.accountId()) {
                userAmount = userAmount + burnAmount;
            }
            totalAmount = totalAmount + burnAmount;
        }
    }

    console.log(`${records.length} burns in total, ${userAmount}/${totalAmount}`);
    let tmpMvoteNum = (userAmount * 100/ totalAmount).toFixed(4);
    if (isNaN(tmpMvoteNum)) {
        tmpMvoteNum = (0).toString();
    } else {
        tmpMvoteNum = (tmpMvoteNum).toString();
    }
    document.getElementsByClassName('mvote_num')[pairIndex].innerHTML = tmpMvoteNum + '%';
    document.getElementsByClassName('burn_num_1')[pairIndex].innerHTML = `${userAmount}`;
    document.getElementsByClassName('burn_num_2')[pairIndex].innerHTML = `${totalAmount}`;     
    return {'userAmount': userAmount, 'totalAmount': totalAmount};
}

function calReward(pairIndex, voteAmount, lpAmount, burnAmount) {
    let averageReward, finalReward;
    averageReward = (voteAmount*2 + lpAmount*1 + burnAmount*1) / 4;
    finalReward = Math.min(voteAmount, averageReward);
    document.getElementsByClassName('your_num')[pairIndex].innerHTML = (finalReward*100).toFixed(4) + '%';
}

function generateTxXDR(pairIndex, burnAmount, burnAsset=MVT, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }

    var burnAccount = PAIRS_LIST[pairIndex]['BURN'];

    var tx = new StellarSdk.TransactionBuilder(
        userAccount, {
            fee: '10000',
            networkPassphrase: NETWORK_PASSPHRASE
        }
    )
        .addOperation(
            StellarSdk.Operation.payment({
                destination: burnAccount.publicKey(),
                asset: burnAsset,
                amount: burnAmount
            })
        )
        .setTimeout(600)
        .build();
    var txXDR = tx.toXDR();
    console.log(`Transaction XDR: ${txXDR}`);
    return txXDR;
}

async function submitTx() {
    var pairName = document.getElementById('signupModal_burn').classList.item(1);
    let pairIndex = NAME_INDEX_DICT[pairName];

    let burnAmount = document.getElementsByClassName('pair_input_value')[0].value;
    if (burnAmount <= 0) {
        alert('Please input value of burn');
        return 0;
    }

    let txXDR = generateTxXDR(pairIndex, burnAmount);

    if (CURRENT_LOGIN_METHOD === 1) {
        try {
            var signedTx = await window.freighterApi.signTransaction(txXDR, NETWORK_TEXT);
        } catch (e) {
            console.log(`Error ${e} in freighter signTransaction().`);
            return 0;
        }
        try{
            var txToSubmit = StellarSdk.TransactionBuilder.fromXDR(signedTx, SEVER_URL);
        } catch (e) {
            console.log(`Error ${e} in freighter buildTransaction().`);
            return 0;
        }
        try{
            var response = await STELLAR_SERVER.submitTransaction(txToSubmit);
            console.log(`Transaction submitted with response ${response}.`);
            return 0;
        } catch (e) {
            console.log(`Error ${e} in freighter submitTransaction().`);
            return 0;
        }
    } else if (CURRENT_LOGIN_METHOD === 2) {
        alert(`Please copy the transaction XDR`);
        document.getElementsByClassName('stellar_copy_link')[0].classList.add('active');
        document.getElementsByClassName('link-ctn-text')[0].innerHTML = `${txXDR}`;
        document.getElementsByClassName('burn-submit-btn')[0].style.pointerEvents = 'none';
        document.getElementsByClassName('burn-submit-btn')[0].setAttribute("target","_blank");
        document.getElementsByClassName('burn-submit-btn')[0].href = "https://laboratory.stellar.org/#txsigner?network=public";
    } else {
        alert('Please login');
        return 0;
    }
}

function checkTrustline(targetAsset=MVT, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }

    var assetBalance = -1;

    var userBalances = userAccount['balances'];
    for (var bIndex in userBalances) {
        if (userBalances[bIndex]['asset_type'] !== "liquidity_pool_shares" &&
            userBalances[bIndex]['asset_type'] !== "native" &&
            userBalances[bIndex]['asset_code'] === targetAsset.getCode() &&
            userBalances[bIndex]['asset_issuer'] === targetAsset.getIssuer()) {
                assetBalance = parseFloat(userBalances[bIndex]['balance']);
                break;
        }
    }

    if (assetBalance >= 0) {
        console.log(`You have ${targetAsset.getCode()} trustline with ${assetBalance} balance.`);
    } else {
        console.log(`You don't have ${targetAsset.getCode()} trustline.`);
    }

    return assetBalance;
}

async function test() {

    for (let i = 0; i < PAIR_NUMBER; i++) {
        let voteAmount, lpAmount, burnAmount;
        voteAmount = await getAquaVote(i).then((AquaVote)=>{ return AquaVote['userAmount']/ AquaVote['totalAmount']});
        lpAmount = await getLPShare(i).then((LPShare)=>{ return LPShare['userAmount']/ LPShare['totalAmount']});
        burnAmount = await getMVoteBurn(i).then((MVoteBurn)=>{return MVoteBurn['userAmount']/ MVoteBurn['totalAmount']});
        console.log(voteAmount, lpAmount, burnAmount);
        if (isNaN(burnAmount)) {
            burnAmount = 0;
        }
        calReward(i, voteAmount, lpAmount, burnAmount);
    }

}