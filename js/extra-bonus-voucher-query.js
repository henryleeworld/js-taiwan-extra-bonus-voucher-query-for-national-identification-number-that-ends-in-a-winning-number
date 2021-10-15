let coupons = [{
    name: '國旅券',
    codes: ['21', '32', '98', '67', '97', '410']
}, {
    name: 'i原券',
    codes: ['64', '85']
}, {
    name: '農遊券',
    codes: ['89', '32', '54', '597', '453', '152']
}, {
    name: '藝fun券(數位)',
    codes: ['96', '15', '07', '30', '73', '98', '19', '11']
}, {
    name: '藝fun券(紙本)',
    codes: ['39', '37', '23', '36', '79', '08', '14', '75']
}, {
    name: '動滋券',
    codes: ['97', '13', '19', '55', '71', '93', '381', '734', '644', '453', '985']
}, {
    name: '客庄劵2.0',
    codes: ['81', '900']
}, {
    name: '地方創生券',
    codes: ['081', '105', '594', '188', '089', '396', '521', '467', '912', '798', '358', '441', '367', '941', '335']
}]

let rs = []

let search = (ids, coupons) => {
    let _rs = ids.map((id) => {
        let winning = [];
        coupons.map((coupon) => {
            coupon.codes.map((code) => {
                if (id.slice(-code.length) === code) {
                    winning.push(`${coupon.name}[${code}]`);
                }
            })
        })
        return {
            id: id,
            winning: winning
        }
    })
    return _rs;
}

let uid = null

function loadUid() {
    uid = document.getElementById('uid');
    uid.value = localStorage.getItem('uid');
}

function render(_rs) {
    let result = document.getElementById('result');
    result.innerHTML = '';
    _rs.map((r) => {
        let h5 = document.createElement('h5')
        h5.appendChild(document.createTextNode(r.id));
        result.appendChild(h5);

        let span = document.createElement('span');
        let winning = r.winning.length > 0 ? `中：${r.winning.join(', ')}` : '都沒中';
        span.appendChild(document.createTextNode(winning));
        result.appendChild(span);
    })
}

function query() {
    document.getElementById('message').classList.remove("d-none"); 
    uid.style.display = null;

    let uids = uid.value.split(',').map((_uid) => _uid.trim());
    localStorage.setItem('uid', uids.toString());

    rs = search(uids, coupons);
    render(rs);
    document.getElementById('mask').style.display = 'block';
}

function mask() {
    uid.style.display = 'none';
    render(rs.map((r) => {
        r.id = r.id.replace(/[a-z\d]/gi, '*');
        return r;
    }))
}

function clean() {
    uid.value = '';
    uid.style.display = null;
    localStorage.removeItem('uid');
    rs = [];
    render(rs);
    document.getElementById('message').classList.add("d-none");
}