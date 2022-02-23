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
CURRENT_LOGIN_METHOD = 0;
CURRENT_USER_ACCOUNT = "";
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
    console.log(StellarSdk);
}

function close_public() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup_public = document.getElementById('signupModal_public');
    popup_public.classList.toggle('active');
    document.querySelector("body").style.overflow = 'scroll';  //reset page scrolling
}

function popup_burn(pair) {
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
}

function close_burn() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup_bn = document.getElementById('signupModal_burn');
    popup_bn.classList.toggle('active');
}

function reset_burn_num() {
    document.getElementsByClassName('pair_input_value')[0].value = "";
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
    for (let i = 0; i < 8; i++) {
        document.getElementsByClassName('lock_num')[i].innerHTML = 0;
        document.getElementsByClassName('lp_num')[i].innerHTML = 0;
        document.getElementsByClassName('mvote_num')[i].innerHTML = 0;
        document.getElementsByClassName('your_num')[i].innerHTML = 0;
      }
    toggle_login_arrow();
    toggle_logout();
    check_login();
}

function check_login() {
    if(CURRENT_LOGIN_METHOD !== 0){
        console.log(`login success`);
        document.getElementsByClassName('menu-login-btn')[0].style.pointerEvents = 'none';
        clockIntervalId = clock(); // first start
        mvoteIntervalId = setInterval(clock, 1000*10*60);
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
            document.getElementsByClassName('login_button')[0].innerHTML = Account.accountId().slice(0, 4) + '...' + Account.accountId().slice(-5, -1);
            document.getElementsByClassName('menu-login-btn')[0].setAttribute("pointer-events", "none");
            toggle_login_arrow();
        })
        .catch((e) => {
            console.log(`This account is INVALID!`);
            console.error(e);
        });

    test();
    CURRENT_LOGIN_METHOD = 2;
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
                    document.getElementsByClassName('login_button')[0].innerHTML = Account.accountId().slice(0, 4) + '...' + Account.accountId().slice(-5, -1);
                    document.getElementsByClassName('menu-login-btn')[0].setAttribute("pointer-events", "none");
                    toggle_login_arrow();
                })
                .catch((e) => {
                    console.log(`This account is INVALID!`);
                    console.error(e);
                });

            CURRENT_LOGIN_METHOD = 1;
        }
    } else {
        alert(`Please download the Freighter extension first!`);
    }
    test();
    check_login();
}

async function getAquaVote(voteAsset, voteKeypair, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }

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
    for(let i = 0; i < PAIR_NUMBER; i++)
        document.getElementsByClassName('lock_num')[i].innerHTML = (userAmount * 100/ totalAmount).toFixed(4) + '%';
    return {'userAmount': userAmount, 'totalAmount': totalAmount};
}

async function getLPShare(LPAsset, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }

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

    var userBalances = userAccount['balances']
    for (var bIndex in userBalances) {
        if (userBalances[bIndex]['asset_type'] === "liquidity_pool_shares") {
            if (userBalances[bIndex]['liquidity_pool_id'] === poolId) {
                userAmount = parseFloat(userBalances[bIndex]['balance']);
                break;
            }
        }
    }
    console.log(`${userAmount}/${totalAmount}`);
    for(let i = 0; i < PAIR_NUMBER; i++)
        document.getElementsByClassName('lp_num')[i].innerHTML = (userAmount * 100/ totalAmount).toFixed(4) + '%';
    return {'userAmount': userAmount, 'totalAmount': totalAmount};
}

async function getMVoteBurn(burnAccount, burnAsset, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }

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
        if (records[recordIndex]['type'] !== "payments") {
            continue;
        } else if (records[recordIndex]['asset_type'] === "native") {
            continue;
        } else if (records[recordIndex]['asset_code'] !== burnAsset.getCode()) {
            continue;
        } else if (records[recordIndex]['asset_issuer'] !== burnAsset.getIssuer()) {
            continue;
        } else {
            var burnAmount = parseFloat(records[recordIndex]['amount']);
            var fromAccount = records[recordIndex]['from'];
            if (fromAccount === userAccount.accountId()) {
                userAmount = userAmount + burnAmount;
            }
            totalAmount = totalAmount + burnAmount;
        }
    }
    console.log(`${records.length} burns in total, ${userAmount}/${totalAmount}`);
    for(let i = 0; i < PAIR_NUMBER; i++){
        let tmpMvoteNum = (userAmount * 100/ totalAmount).toFixed(4);
        if(isNaN(tmpMvoteNum))
            tmpMvoteNum = (0).toString();
        else
            tmpMvoteNum = (tmpMvoteNum).toString()
        document.getElementsByClassName('mvote_num')[i].innerHTML = tmpMvoteNum + '%';
    }
    return {'userAmount': userAmount, 'totalAmount': totalAmount};
}

function generateTxXDR(burnAccount, burnAsset, burnAmount, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }

    var tx = new StellarSdk.TransactionBuilder(
        userAccount, {
            fee: StellarSdk.BASE_FEE,
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

async function submitTx(txXDR) {
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
        //TODO: Copy tx XDR and redirect to https://laboratory.stellar.org/#txsigner?network=public
        return 0;
    }
}

async function test() {
    var XLM = new StellarSdk.Asset.native();
    var AQUA = new StellarSdk.Asset("AQUA", "GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA");
    var PYBC = new StellarSdk.Asset("PYBC", "GBVB43NLVIP2USHXSKI7QQCZKZU2Z6U6A5PAHMIW7LLNVMQJTOX2BZI5");

    var XLM_PYBC_VOTE = StellarSdk.Keypair.fromPublicKey("GDLJR23GLUMUTYOH2M6CMLBCLM4F7COSRCM6ZR2C43FMSC5MYW2WH44J");
    var XLM_PYBC_POOL = new StellarSdk.LiquidityPoolAsset(XLM, PYBC, 30);
    var XLM_MVOTE_BURN = StellarSdk.Keypair.fromPublicKey("GCK5NJEQF4AW7IZ3EOSEP5A5KNGVARB7NWSO2OU2OO7UXC73WYKT4Y3D");

    await getAquaVote(AQUA, XLM_PYBC_VOTE);
    await getLPShare(XLM_PYBC_POOL);
    await getMVoteBurn(XLM_MVOTE_BURN, AQUA);
}
