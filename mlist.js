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

XLM_MVT_VOTE = StellarSdk.Keypair.fromPublicKey("GCVBVPIE36TPOJ2R3VPE2XIUGWHUTGMWFIHHJU4N4CN3VBLDUHLTROC7");
XLM_USDC_VOTE = StellarSdk.Keypair.fromPublicKey("GDTNR6E3WVQNELVDSQKBEELR2O2PKKD2MPNGOERU42O765RDLVOLE6PL");
MVT_USDC_VOTE = StellarSdk.Keypair.fromPublicKey("GC6LMZPOLZY2LTJQTD7VVB7UUQP3XBQ2H4IYHX4K7AGGSG42ARRQ3FIG");
ADD_NEW_VOTE = StellarSdk.Keypair.fromPublicKey("GA4O7UXHHTZZG26OYBACM2PA3YB7H3HW3L7F7GSYQRREQSUSMK7NGQPW");

CURRENT_LOGIN_METHOD = 0;
CURRENT_USER_ACCOUNT = "";

MLIST_LIST = [ADD_NEW_VOTE, XLM_MVT_VOTE, XLM_USDC_VOTE, MVT_USDC_VOTE];

NAME_INDEX_DICT = {
    'ADD-NEW': 0,
    'XLM_MVOTE': 1,
    'XLM_USDC': 2,
    'MVOTE_USDC': 3,
};

PAIR_NUMBER = 3;
UPDATE_TIME = 1000*60;  // one min
UPDATE_SWITCH = 1;
var mvoteIntervalId;
var clockIntervalId;


function clock() {
    let timeStamp = Number(10*UPDATE_TIME);
    let before = new Date().getTime();
    const clockInterval = setInterval(function() {
        var now = new Date().getTime();
        var distance = now - before;
        if(UPDATE_SWITCH === 1){
            test();
        }
        if (distance > timeStamp) {
            clearInterval(clockInterval);
            console.log(`clock time is up`);
            UPDATE_SWITCH = 1;
        } else if(distance >= (9*UPDATE_TIME)) {
            console.log(`last update 9 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '9 minutes ago';
        } else if(distance >= (8*UPDATE_TIME)) {
            console.log(`last update 8 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '8 minutes ago';
        } else if(distance >= (7*UPDATE_TIME)) {
            console.log(`last update 7 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '7 minutes ago';
        } else if(distance >= (6*UPDATE_TIME)) {
            console.log(`last update 6 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '6 minutes ago';
        } else if(distance >= (5*UPDATE_TIME)) {
            console.log(`last update 5 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '5 minutes ago';
        } else if(distance >= (4*UPDATE_TIME)) {
            console.log(`last update 4 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '4 minutes ago';
        } else if(distance >= (3*UPDATE_TIME)) {
            console.log(`last update 3 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '3 minutes ago';
        } else if(distance >= (2*UPDATE_TIME)) {
            console.log(`last update 2 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '2 minutes ago';
        } else if(distance >= (1*UPDATE_TIME)) {
            console.log(`last update 1 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '1 minute ago';
        } else if(distance >= (0)) {
            console.log(`last update 0 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = 'just now';
            UPDATE_SWITCH = 0;
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
    if(CURRENT_USER_ACCOUNT === ""){
        alert('Please login.');
        return 0;
    }
    document.getElementById('signupModal_burn').classList.add(pair);
    if(pair.includes('_')){
        let imageNames = pair.split('_');
        // console.log(imageNames.length, imageNames);
        document.getElementsByClassName('pair_input_value')[0].value = "1";
        document.getElementsByClassName('balance-num')[0].innerHTML = "1";
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
                    document.getElementById(tmpPairName).innerHTML = "MVT";
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
                    break;
            }  
        }
    } else if(pair.includes('-')){
        document.getElementById('burn-pair-image-1').src="https://pixsector.com/cache/1549118e/av70a149d5d0f534e7ab0.png";
        document.getElementById('burn-pair-image-2').src="https://pixsector.com/cache/1549118e/av70a149d5d0f534e7ab0.png";
        document.getElementsByClassName('at-least-burn')[0].innerHTML = "100";
        let tmpName1 = document.getElementsByClassName('mlist-name-1')[0].value;
        let tmpName2 = document.getElementsByClassName('mlist-name-2')[0].value;
        let tmpIssuer1 = document.getElementsByClassName('mlist-issuer-1')[0].value;
        let tmpIssuer2 = document.getElementsByClassName('mlist-issuer-2')[0].value;
        if(tmpName1 === "" || tmpName2 === ""){
            alert('Please add currency name');
            return;
        }
        if(tmpIssuer1 === "" || tmpIssuer2 === "") {
            alert('Please add currency issuer');
            return;
        }
        document.getElementById('pair-ctn-desp-1').innerHTML = tmpName1;
        document.getElementById('pair-ctn-desp-2').innerHTML = tmpName2;
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
    document.getElementsByClassName('pair_input_value')[0].value = "100";
    document.getElementsByClassName('balance-num')[0].innerHTML = "100";
    document.getElementsByClassName('stellar_copy_link')[0].classList.remove('active');
    document.getElementsByClassName('title-tip-span')[0].classList.add('active');
    document.getElementsByClassName('title-tip-span')[1].classList.remove('active');
    document.getElementById('signupModal_burn').classList.remove(document.getElementById('signupModal_burn').classList.item(1));
    document.getElementsByClassName('burn-btn-main')[0].classList.add('disabled');
    document.getElementsByClassName('burn-submit-btn')[0].style.pointerEvents = 'none';
    document.getElementsByClassName('title-tip-span-text')[0].innerHTML = "NA";
    document.getElementsByClassName('burn-loader-ctn')[0].classList.remove('active');
    document.getElementsByClassName('burn-submit-btn')[0].innerHTML = "Submit";
}

function confirm_burn_num() {
    let tmp = Number(document.getElementsByClassName('pair_input_value')[0].value);
    let burnThreshold;
    if(document.getElementById('signupModal_burn').classList.item(1).includes('_')){
        burnThreshold = 1;
    } else {
        burnThreshold = 100;
    }
    if(tmp<burnThreshold) {
        alert('Please input number greater than '+burnThreshold);
    } else {
        document.getElementsByClassName('balance-num')[0].innerHTML = document.getElementsByClassName('pair_input_value')[0].value;
        document.getElementsByClassName('burn-btn-main')[0].classList.remove('disabled');
        document.getElementsByClassName('burn-submit-btn')[0].style.pointerEvents = 'auto';
    }
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
        document.getElementsByClassName('mlist_your_vote')[i].innerHTML = 'NA';
    }
    CURRENT_USER_ACCOUNT = "";
    CURRENT_LOGIN_METHOD = 0;
    UPDATE_SWITCH = 1;
    toggle_login_arrow();
    toggle_logout();
    check_login();
}

function check_login() {
    if(CURRENT_LOGIN_METHOD !== 0){
        console.log(`login success`);
        document.getElementsByClassName('menu-login-btn')[0].style.pointerEvents = 'none';
        clockIntervalId = clock(); // first start
        mvoteIntervalId = setInterval(()=> {clockIntervalId = clock()}, 10*UPDATE_TIME);
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
            alert(`This account is INVALID!`);
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

async function getMVoteBurn(pairIndex, burnAsset=MVT, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    // if (userAccount === "") {
    //     return 0;
    // }

    var burnAccount = MLIST_LIST[pairIndex];

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
            if (userAccount !== "") {
                if (fromAccount === userAccount.accountId()) {
                    userAmount = userAmount + burnAmount;
                }
            }
            totalAmount = totalAmount + burnAmount;
        }
    }

    console.log(`${records.length} burns in total, ${userAmount}/${totalAmount}`);

    if (userAccount !== "") {
        document.getElementsByClassName('mlist_your_vote')[pairIndex-1].innerHTML = userAmount.toFixed(0);
    }
    document.getElementsByClassName('mlist_current_vote')[pairIndex-1].innerHTML = totalAmount.toFixed(0);   
    return {'userAmount': userAmount, 'totalAmount': totalAmount};
}

function generateTxXDR(pairIndex, burnAmount, burnAsset=MVT, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }

    var burnAccount = MLIST_LIST[pairIndex];
    var tmpName = document.getElementsByClassName('mlist-name-1')[0].value+'-'+document.getElementsByClassName('mlist-issuer-1')[0].value.slice(-4)+':'+
                  document.getElementsByClassName('mlist-name-2')[0].value+'-'+document.getElementsByClassName('mlist-issuer-2')[0].value.slice(-4);
    console.log(`tmpName:`, tmpName);
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
                amount: burnAmount.toString()
            })
        )
        .addMemo(
            StellarSdk.Memo.text(tmpName)
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
        document.getElementsByClassName('burn-loader-ctn')[0].classList.add('active');
        document.getElementsByClassName('burn-submit-btn')[0].innerHTML = "";
        try {
            var signedTx = await window.freighterApi.signTransaction(txXDR, NETWORK_TEXT);
        } catch (e) {
            console.log(`Error ${e} in freighter signTransaction().`);
            alert(`Fail to sign the transaction.`);
            close_burn();
            return 0;
        }
        try{
            var txToSubmit = StellarSdk.TransactionBuilder.fromXDR(signedTx, SEVER_URL);
        } catch (e) {
            console.log(`Error ${e} in freighter buildTransaction().`);
            alert(`Fail to build the transaction.`);
            close_burn();
            return 0;
        }
        try{
            var response = await STELLAR_SERVER.submitTransaction(txToSubmit);
            console.log(`Transaction submitted with response ${response}.`);
            alert(`Successfully send the transaction.`);
            close_burn();
            return 0;
        } catch (e) {
            console.log(`Error ${e} in freighter submitTransaction().`);
            alert(`Fail to submit the transaction.`);
            close_burn();
            return 0;
        }
    } else if (CURRENT_LOGIN_METHOD === 2) {
        document.getElementsByClassName('burn-loader-ctn')[0].classList.add('active');
        document.getElementsByClassName('burn-submit-btn')[0].innerHTML = "";
        document.getElementsByClassName('stellar_copy_link')[0].classList.add('active');
        document.getElementsByClassName('link-ctn-text')[0].innerHTML = `${txXDR}`;
        document.getElementsByClassName('link-ctn-url')[0].href= "https://laboratory.stellar.org/#txsigner?network=public";
        document.getElementsByClassName('burn-submit-btn')[0].style.pointerEvents = 'none';
    }
}

function checkTrustline(targetAsset=MVT, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return -1;
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

async function withoutLogin() {

    var burnPromise = [];

    for (let i = 1; i <= PAIR_NUMBER; i++) {
        burnPromise.push(getMVoteBurn(i));
    }

    await Promise.all(burnPromise);
}

async function test() {
    var burnPromise = [];

    for (let i = 1; i <= PAIR_NUMBER; i++) {burnPromise.push(getMVoteBurn(i));}
    await Promise.all(burnPromise);
}
