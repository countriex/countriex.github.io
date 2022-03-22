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

RANK_CHOICE_1 = StellarSdk.Keypair.fromPublicKey('GDWSVTPOFHEOJBHO7K5MXWIQJKQMQ6VQMBWJQ43CPAUYQ6US5QLS2G7D');
RANK_CHOICE_2 = StellarSdk.Keypair.fromPublicKey('GD6GYSJZSNXL2IG5VL4XVHWPCETQFWXV7NT4EKO7SBJWWQ6A62SG3QJD');
RANK_CHOICE_3 = StellarSdk.Keypair.fromPublicKey('GCF7XE4LKRWXVHSLNO5Z3NY3YNWCX6L3YKPKGELH6DW7UZDEHBM3CJ7M');
RANK_CHOICE_4 = StellarSdk.Keypair.fromPublicKey('GDKGFQ44TD5IWYGFQB4HMNA5KUU62Y5KIT6IOLNWROQ4TWNY55KDZPAR');
RANK_CHOICE_5 = StellarSdk.Keypair.fromPublicKey('GAUSDEWZGLZJFKZOIN6WJEHJ22JZBNNO5MGOK2MISFEWGYB4V7DC4JPP');
RANK_CHOICE_6 = StellarSdk.Keypair.fromPublicKey('GCYWV52LUKXQ37G4CG3JILDYCDCXDLNYHACLA6DJ7DUEFAJDFIO65O2P');
RANK_ADD_NEW = StellarSdk.Keypair.fromPublicKey('GBQ5GPUDFBK24QX4VWT6ECTVYWHJZMRQFL7GK72A4JWKBLSDFC555QQI');


CURRENT_LOGIN_METHOD = 0;
CURRENT_USER_ACCOUNT = "";

RANK_LIST = [RANK_CHOICE_1, RANK_CHOICE_2, RANK_CHOICE_3, RANK_CHOICE_4, RANK_CHOICE_5, RANK_CHOICE_6, RANK_ADD_NEW];

NAME_INDEX_DICT = {
    'MVT': 0,
    'AQUA': 1,
    'YBX': 2,
    'LSP': 3,
    'CAFE': 4,
    'FISH': 5,
    'ADD-NEW': 6
};

PAIR_NUMBER = 6;
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
    if(pair.includes('-')){
        let tmpName1 = document.getElementsByClassName('mlist-name-1')[0].value;
        let tmpIssuer1 = document.getElementsByClassName('mlist-issuer-1')[0].value;
        if(tmpName1 === ""){
            alert('Please add currency name');
            return;
        }
        if(tmpIssuer1 === "") {
            alert('Please add currency issuer');
            return;
        }
        document.getElementsByClassName('pair_input_value')[0].value = "100";
        document.getElementsByClassName('balance-num')[0].innerHTML = "100";
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
    document.getElementsByClassName('pair_input_value')[0].value = "1";
    document.getElementsByClassName('balance-num')[0].innerHTML = "1";
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
    if(document.getElementById('signupModal_burn').classList.item(1).includes('-')){
        burnThreshold = 100;
    } else {
        burnThreshold = 1;
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
        document.getElementsByClassName('rank-your-burn')[i].innerHTML = "0";
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

    var burnAccount = RANK_LIST[pairIndex];

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
    let tmpMvoteNum = (userAmount * 100/ totalAmount).toFixed(4);
    if (isNaN(tmpMvoteNum)) {
        tmpMvoteNum = (0).toString();
    } else {
        tmpMvoteNum = (tmpMvoteNum).toString();
    }
    if (userAccount !== "") {
        document.getElementsByClassName('rank-your-burn')[pairIndex].innerHTML = tmpMvoteNum + '%';
    }
    document.getElementsByClassName('rank-your-burn')[pairIndex].innerHTML = userAmount.toFixed(0);
    document.getElementsByClassName('rank-total-burn')[pairIndex].innerHTML = totalAmount.toFixed(0);   
    return {'userAmount': userAmount, 'totalAmount': totalAmount};
}

function generateTxXDR(pairIndex, burnAmount, burnAsset=MVT, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }

    var burnAccount = RANK_LIST[pairIndex];
    var tmpName = document.getElementsByClassName('mlist-name-1')[0].value+'-'+document.getElementsByClassName('mlist-issuer-1')[0].value.slice(-4);


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

    for (let i = 0; i < PAIR_NUMBER; i++) {burnPromise.push(getMVoteBurn(i));}
    await Promise.all(burnPromise);
}

async function test() {

    var burnPromise = [];

    for (let i = 0; i < PAIR_NUMBER; i++) {burnPromise.push(getMVoteBurn(i));}
    await Promise.all(burnPromise);
}
