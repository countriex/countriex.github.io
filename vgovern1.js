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

GOV1_CHOICE_1 = StellarSdk.Keypair.fromPublicKey('GA3PSJPSQJ237NVFNHHNO6N7FRI4C4JZ2WPTWR5LCFCBPH7XVZYYOWWG');
GOV1_CHOICE_2 = StellarSdk.Keypair.fromPublicKey('GDLSNS642OKIQEUMIVZNL2LCSJA6S5WGRMLZJPWWZVKHOAFVZXOTODYS');
GOV1_CHOICE_3 = StellarSdk.Keypair.fromPublicKey('GAXGZRMVNXXPYIDHOBFT4UHEHY5M2JCJC66CGPLOST3ZC3ZZLE7EZQGE');

CURRENT_LOGIN_METHOD = 0;
CURRENT_USER_ACCOUNT = "";


GOV_LIST = [GOV1_CHOICE_1, GOV1_CHOICE_2, GOV1_CHOICE_3];

CHOICE_NUMBER = 3;



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
    document.getElementsByClassName('choice-name')[0].innerHTML = pair.split('-')[1];
    console.log(pair);

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
    if(tmp<1) {
        alert('Please input number greater than 1.');
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
    for (let i = 0; i < CHOICE_NUMBER; i++) {
        document.getElementsByClassName('burn-gov-num-1')[i].innerHTML = "0";
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
        test();
    } else {
        console.log(`login fail`);
        document.getElementsByClassName('menu-login-btn')[0].style.pointerEvents = 'auto';
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
    console.log(`burn`, pairIndex);
    var burnAccount = GOV_LIST[pairIndex];

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
        document.getElementsByClassName('burn-gov-num-1')[pairIndex].innerHTML = userAmount;
    }
    return {'userAmount': userAmount, 'totalAmount': totalAmount};
}

function generateTxXDR(pairIndex, burnAmount, burnAsset=MVT, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }
    var burnAccount = GOV_LIST[pairIndex];
    
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
        .setTimeout(600)
        .build();
    var txXDR = tx.toXDR();
    console.log(`Transaction XDR: ${txXDR}`);
    return txXDR;
}

async function submitTx() {
    var pairName = document.getElementById('signupModal_burn').classList.item(1);
    let pairIndex;
    if (pairName.includes('Choice')) {
        let tmp = pairName.split('-')[1];
        switch(tmp) {
            case '1':
              console.log('Choice 1');
              pairIndex = 0;
              break;
            case '2':
                console.log('Choice 2');
                pairIndex = 1;
                break;
            case '3':
              console.log('Choice 3');
              pairIndex = 2;
              break;
            default:
              console.log(`Sorry, input is wrong.`);
        }
          
    }
    
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

    var totalBurn = [];
    var burnPromise = [];
    // var datum = new Date(Date.UTC('2022','02','05','16','40','30'));  // month start from 0
    // console.log(datum);
    // if(new Date().getTime() > datum){
    //     for(let i=0; i<CHOICE_NUMBER; i++){
    //         document.getElementsByClassName('gov-confirm-btn')[i].style.pointerEvents = 'none';
    //         document.getElementsByClassName('gov-confirm-btn')[i].style.backgroundColor= '#d0d0e1';
    //     }
    // }

    for (let i = 0; i < CHOICE_NUMBER; i++) {
        burnPromise.push(getMVoteBurn(i));
    }
    await Promise.all(burnPromise)
    .then((MVoteBurn) => {
        for (let i = 0; i < CHOICE_NUMBER; i++) {
            totalBurn.push(MVoteBurn[i]['totalAmount']);
        }
    });
    console.log(`gov totalBurn`, totalBurn);
    for (let i = 0; i < CHOICE_NUMBER; i++) {
        document.getElementsByClassName('burn-gov-num-2')[i].innerHTML = totalBurn[i];
    }
}

async function test() {
    var burnPromise = [];

    for (let i = 0; i < CHOICE_NUMBER; i++) {
        burnPromise.push(getMVoteBurn(i));
    }
    await Promise.all(burnPromise);
}