let coupons = [{
    name: '【第一週】國旅券',
    codes: ['21', '32', '98', '67', '97', '410']
}, {
    name: '【第一週】i原券',
    codes: ['64', '85']
}, {
    name: '【第一週】農遊券',
    codes: ['89', '32', '54', '597', '453', '152']
}, {
    name: '【第一週】藝fun券(數位)',
    codes: ['96', '15', '07', '30', '73', '98', '19', '11']
}, {
    name: '【第一週】藝fun券(紙本)',
    codes: ['39', '37', '23', '36', '79', '08', '14', '75']
}, {
    name: '【第一週】動滋券',
    codes: ['97', '13', '19', '55', '71', '93', '381', '734', '644', '453', '985']
}, {
    name: '【第一週】客庄劵2.0',
    codes: ['81', '900']
}, {
    name: '【第一週】地方創生券',
    codes: ['081', '105', '594', '188', '089', '396', '521', '467', '912', '798', '358', '441', '367', '941', '335']
}, {
    name: '【第二週】國旅券',
    codes: ['87', '04', '40', '29', '71']
}, {
    name: '【第二週】i原券',
    codes: ['12', '59']
}, {
    name: '【第二週】農遊券',
    codes: ['50', '13']
}, {
    name: '【第二週】藝fun券(數位)',
    codes: ['78', '00', '39', '22', '61', '23', '15']
}, {
    name: '【第二週】藝fun券(紙本)',
    codes: ['37', '76', '31', '06', '51', '65', '81']
}, {
    name: '【第二週】動滋券',
    codes: ['91', '11', '04', '18', '57', '498', '756']
}, {
    name: '【第二週】客庄劵2.0',
    codes: ['11', '439', '841', '052', '206', '161', '457', '205', '012', '293', '446', '589']
}, {
    name: '【第二週】地方創生券',
    codes: ['598', '880', '886', '675', '684', '568', '645', '456']
}, {
    name: '【第三週】國旅券',
    codes: ['44', '34', '09', '55', '35', '041']
}, {
    name: '【第三週】i原券',
    codes: ['48', '49']
}, {
    name: '【第三週】農遊券',
    codes: ['60', '75']
}, {
    name: '【第三週】藝fun券(數位)',
    codes: ['01', '92', '19', '23', '79', '95', '48', '46']
}, {
    name: '【第三週】藝fun券(紙本)',
    codes: ['31', '56', '02', '52', '44', '49', '00', '47', '59']
}, {
    name: '【第三週】動滋券',
    codes: ['82', '45', '57', '53', '00', '546', '855', '865', '012', '983']
}, {
    name: '【第三週】客庄劵2.0',
    codes: ['14', '269']
}, {
    name: '【第三週】地方創生券',
    codes: ['711', '706', '064', '168', '191', '459', '135', '314', '366']
}];

let rs = [];

let search = (ids, coupons) => {
    let _rs = ids.map((id) => {
        let winning = [];
        coupons.map((coupon) => {
            coupon.codes.map((code) => {
                if (id.slice(-code.length) === code) {
                    winning.push(`${coupon.name} [${code}]`);
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

let uid = null;

function loadUid() {
    uid = document.getElementById('uid');
    uid.value = localStorage.getItem('uid');
}

function render(_rs) {
    let result = document.getElementById('result');
    result.innerHTML = '';
    _rs.map((r) => {
        let h5 = document.createElement('h5');
        h5.appendChild(document.createTextNode(r.id));
        result.appendChild(h5);

        let span = document.createElement('span');
        if (r.winning.length > 0) {
            let ul = document.createElement('ul');
            r.winning.map((w) => {
                let li = document.createElement('li');
                li.appendChild(document.createTextNode(w));
                ul.appendChild(li);
            })
            result.appendChild(ul);
        } else {
            span.appendChild(document.createTextNode('都沒中'));
            result.appendChild(span);
        }
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