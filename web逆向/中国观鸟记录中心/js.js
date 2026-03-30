const CryptoJS = require("crypto-js");
const {JSEncrypt} = require('@linlabs/encryptlong');
// console.log("+++")
// console.log(JSEncrypt)
// console.log("++")


// AES 解密
const decode = function (data) {
    const cfg = {
        "key": "6756696653534952657053656868665752665050485566485667545454484967",
        "iv": "53536868555767547048526949655455"
    }
    let _0x3c6fa1 = {
        "words": [1127761218, 892678452, 1095120193, 1145324089, 876753458, 808927792, 943928886, 909128003],
        "sigBytes": 32
    }
    let _0x3ec027 = {
        "words": [892683332, 926499638, 1177564229, 826357303], "sigBytes": 16
    }
    // console.log(_0x3c6fa1)
    return CryptoJS["AES"]["decrypt"](data, _0x3c6fa1, {
        'iv': _0x3ec027, 'mode': CryptoJS["mode"]['CBC'], 'padding': CryptoJS['pad']["Pkcs7"]
    })['toString'](CryptoJS['enc']['Utf8']);
}

const test_data = "CSVcL3MaPYD6/IETvC9cebZmUVe3BI24HonePQjfXUfDHoeNoEy0saK0vOR7wmmhSQC4oT7cnslFZ6gih97kiESd3p67UGmxQDXywofZ4e7bjuXlHQA5jVugAyc5i2TmmuR4aAqKvkgHgQDtTfyltXv8++N1H69yKZZHOdEBxvQDHqGpwYHEqmaZYozTrQeEdYxhOYiMXk4cK8tWEpPMpfcWSgTO9++NEUN+rQesOcdWd4mBhoFy80yo+/7qhgEDUDxTcC67npcz+VgLXPghnXP7B8c7PadG2/XlD3VxRlsjO3MJKGpSMmA6uM9gURTtJnzHA+VTsFCm/FwwUTnVWK4WXuIY56daE3OSgQ1ee2Jk/oyw7gr2enSvD7BGgZhA8CW8U5fD6juE5XUYC5QO0mx6SU9PG8rCqGD/tvXOTbcrXm2bjbF+Iqlpl70nAGAk4mNjdJO2VkNlNFc1AxzRmjbvPfWTk09LhUH9EDIDZ8dJdJRREb7x0UVmL2OjaRNeRmdVbj4lqUMU9cBD1wKXWA9n2Xal7+5uIjETjottuu37vUESDd/ql/Iz0Ig4PBE6w3mUoN2NNVH3YvZE1GR027io4Em0fsnIVUx7ZZLKBq0ixcAKGmfeswAmOJIXE5ssclz9/Bv148oXkRgkpswCnTrerpgufNsTZjZ5TtZehjBbvkgYgOxBzFLXrJbG2WBizw8XQv1rjBpzA25qyQLgWWEp5cqjZzRwdDKDYszvBJn30JH1cggVHPQxYluZDet2dQjznquaDqXWIgeqiDt5L5YTEc5YGGAorT3GzY7pdwApLTCTQT6RV9kLYF+wVH6pr+j3JIKVo5LNhbNYn9T/wg9FQsW9udjGCBAigcthkTYVW8gm6m14mjsLA2cQBnVOEQpPL3z4Bt0fk69mLA5v0whjJgaVpUtLQAV67sehPk35EW6HvtJTZa0Ut1avowt+cwSUaQ3+N7n4Di52RpTorrgxtIcd3owe0yVGsr4YXryHu3ekTIB8GqmFBg4RIbZsgedCnac5ibagFTclmw9rlrnB9o7pj9noTS4hG5HLZs4FXooYoTeT+k/LKN412iguS4AhbZEizKkiYqJjF5yS3I57DXSy9uJFqUC2AMiwazxx/FbOAvjbZ/jhJQ/ToF0kysjt3aklOJiLCD7KUyhChsvRKYcdO5HdHK+HRUKh/nGbRKh6+HWuJ4IHJyxPrNZzQPfCXXydp6hB+wMCfN/R0LOWN9vDQqjqOaMEzLWATanYiSee2lYlv96RZUXu8eYE0V+NzphkOkHLf7teTL6D/kLIQ3aMI0fgo10vKUXIAG9H8E6RjX3qPgSXyoSxtfQu3kVI2f0ZWGYQBIQDomiwaYsiljPjY9cd/0BfHK2r7TPzR+v1w14NK9/ZkUo3RYmBRfZtm4n1dAe17gW4Lk1Fa91ePJyUXFRFeXyQtr2X9E7JV9FpDYM97nkMFJA+zloJTKWjTjhFpPwxFAOu4FX3TbHPACmV4duofsK9g0rKhp3T3Tcq6gpkpzL4ZRQ3Wa+TQJ7g7QuHXbU6NCMaLmcqghdk75Y2/6dH2ofE7hMlY5lIy49Pz/BKHqm+CSPT4r/QXjzkiCvRfVvX771cQQVWtk3juFrty3+9MSHrr4ErSmKpiUnhhzEokpyoNk58NTLzJl61oc7v3PxcOFqQih0pCSbL8cy6PptH+U0dF7gQgkdAzPdGNMrzpp3KVClqu26cyanJg98ne/T3AXgo2h7P3WxFe/lulIkqa8qyeObuqEAhO1NuI+2c9yMTUI5gSaT2pToEcYB2pN/4BQkZPF68tTnhZSbYk8o1Dk+x4bDTv8rVB+1cveMQSzXE21dyZsUyT+CqmWZ58tf2/P9nigFYqwFof7d8OEvwX7nvTSmU6pl1zFy/6QngfPCSRK1eeE/lLfneMFepmdsNwJan3IW6ri5UaVUQPqi4RU9phmpL7rzIvb9snH92Stn6wHTKcZ5haRjBC1Bh1PE2Qe0AG9wkdFbLZ1MfK149yibB4eq6qtpc+i//Gpgc8pWqJDshPdKstlEeqnSTZlhnwxfZATsz99UzRuBfaGns0aH36Ha8le9FMr5LG4TPWCjrBP6FBYIhPiejs4ZT7e8kM2GkKoF8EnYitukC9PO5Bgm7b8v6jLlohx3eGLrKRp2P5b2M5t3mC+H2QD4EaOOKt35sTmKRa13/qoS6FYTTcMgdPw/4yVjLXVGdK3giYLKB0x28ZEHRaIFT7vGP8ttvJkFEDZNNu+RVGNzT0OJRXxGhT7A5ZAUUdWNWIme+CNGUgrRx2a8xlNPyoHymOV1LKH63aIXOmc+74oHWRuzu3reBnhwqzvj3oJae60rskH6g7hCjeJJkPHvo2kz0zTIVyehULrKAkuUoujPWdxXicTvkO2uwyenKlBWfuI5C1X3jI3skcIHa4zBIsEKpanOfV+Jegw5h2kU/QP5J/kfZZVHkwHnbBibBu2yrMNX+a0MNDYZczbTp7M6nUwsYPg3G5Akxde7vjXkHzwgtAGpL+WdjrJq8SGpvWTqyImh0USZEWvFtimOc844mbulX4Eb33ANn6o4W3LTX5CiAWirQJOgI0YeqGTjZIrI2E/ItBX241JtconShwJ4dy8HkeslCP5LRU/6DTh0VEQoLj+nxhZ1+uUPDKxIZxApPtQYWx/58Co0lldmNC6FoIh/iVMq651+65MSTyU7G4YezHIOLO4WOangO+ZnWa6Xl8cLagx76k+b20+f9Hv+M8hsKxs+QhRvXbfKR4Ot3F3jZSgd4w2FkPu6WjX2zg7habjYS5S4LrRtrDeYqx0/E2+MBG5rzPcnv0i2qOKGqZqnQClIOipoeTIs+xIQtUEhIFPhsTDCFBwOkWTA0wfYKBbp8RbTYiK+mQcLjODcK9JOGOZMBbjvIrryZXuZYEKthYzyEA5NuFN7HEfDSujTgnYxpStleGm1Q/DLsW9toyqI2Wvv4PUAp6ZM5qNyPKGkymvB9tiHdbfgBT1xXeqrIUmEbBThy0BD/2t4jynX2kqzV5QTd/DUPutay0Z7eqUF477hCobgJ4g+1YcOOQJZvKffgXsgGUW/gs6iEMJMAYRCBAn4A6jjarGtLmUOg8N1ibZlYE+BxhWSQVxAe3xBgQhscTJyWaxzN/vmj9g5u5cmzTYP1OcAg3ERXn4s+mafUwOaU78/XM42RutgxTr/kyjEi6YJjaB0UBVcZ7ovU3NxJfHi9HM1bQgyYZFZRKgqBkSqgHuJB2sDEk/u0/Pvgw5pXvfoSreo84JYWhYU8jy+Sui5fidwKSJFeuoVzoiZVL7k3RkV9qAEpFkYtgIwigJs71QgStGSJo/z7RAfe+QugIHy+BMrvQuKb490yPQglyy3YdfydlcCxRW9Quj+yJNbCZRFEhUODaQP0BpXUgrA2nQLXSiTBq88TryaL+zxcRzr1G9hKAOVvEZ7Rmt+j6ZTQadm+sFqqlz95WR9RAPYWvBu4wZw/WARdgfpwSrxTEaNQxj1vrofOi3PpJUaDy0Ewc9PWhgVYHH4tGn9oN8gwRj20c+hd9/GOHqoEEWrg1IcZW7fTDrUjgvT5qAfN6L2ENd9EF3W7B7w5vuJszA3PDXNuqA5hAnM0uyS/0/A7Pfh/KUMfAk4wRyoGTznlixiLF161rA8fxsLDgpV9RkZuYDsIU2r8YTa+AfPhazDnIjiJ7cYtcalcXq7cbRClCnEj3ofZ5dYW+YEFUng+c5Qok3GKU03EylFO7oyZ2ZtFIIlv4he1jEPF8DCZWOOMa4a2u0vhj4nnNuwQhidR4CHxulD7it2EODzQmWmGIg97bw02j0QTuTYPNx2wzpMUZpfWRAbHvwx9roPeJT8pVbFUEHkB/4EN/AiNInHLH8p64S4jp83g4OmYj1XcyW4SKxdqMpD9Aj2nbnpqjLGB8epBe3aJBe0b/VUO7xN7Haedq4NnHMJVJKhFU+SFZXgz5a50z9rjiuDhKMmiy9DqJfX84jMtu1iYRtdQSG4+SdvHyzyM+LyHioDkkKRnKiDRXJj5peuYqYLapYT3I2UvShsK7o5D+kmiQmZh8w7PMo8iTMVvE0puOhbz+whyfC39ErbHWVVEu9P2fzNIKacxYyQCoIXGqvkJXd2uIXPRWIvyBnN2Ui68wEy0nivDcJZ+dfzWOpaoawpbroeWv+2A8MzPJGxRMrmWP9H98Jo04rraVC68JOC14HwhIkjIwI8AdUGHk9VAmN6gyjC1OzVDROhv+3fhBO2mKOZ9g/zuccKyq2f6+HH6buI9w05+WYAR8WkRVeYsyrDjmTPjGVa7v4nHsZQFoK3SWPyq+jhvM8ysM+hrxyPXniuwhohjMVNkWmSg+3yShgp8sAipTt6jGN9FUxm6Rznvdhernq8Vfg3G1hnbytbw4JH+BTM5pXcKoC+GmRblrCLcaHBpfKNgrOLfYIu2sNbsJXLD2TGqeeMUVtlUtTmj/gy3rZChq131SSTYJxo87MG/nOQsU3KBt9wVEAgvjNl7PVom1cBgn64IK1CoSq+bdAKadtVSuJn8YOFLHgvlgAGaFnKIF+hrbPONVHwJiRMYcTeuEvD0eBAlz+JwYTdHtIR+UNdA4nKELQonfcsQYryldxtX1CwshYQlPmyRwfirAsQTuYurc6t5k6/Xnkjns0IOv5O8nNpjcr/34DEAl2AllS5tagT7gJYvG/u5smZKdYfHacyLsT7/e7cHYdb2Vy0OphvMlgN6KmEJPByR2fMzd/onm4JprmAc8L2cm8SIKAqOE+NWlj9qQrC5XRJSw2Cgm0+EHJVmglwswBAuoIuQvXfrHZGVsXiFQaVwk6TqxpLZ1J9x1PazWMuwrQ0TPrPpxZKwUF8aLNDWGPWyqEqxoJQJyzoQJ2SOejOJIuW500vAf/wImVaFo4OTylvKM9D0TyXQGOonewWvjAlE8bfBfGmudYWS27uZCtr4tFuQuPc+uZFULZi7R7qMq1Bnof115whwaA+RKUP+n86/40tv3LsxPyZOrBB7ZDrnaQVwDmH7CgxS6l+uSUk3ZdAvxAGGqJ/GQC6HQm3JyfYlGC8bfdIp0nOuw3MLHiDJ/serDk8aShdD0Ed1pkNdh/McvDG5K1J45BjDGveM/tdGQ4cGgSjHdsNNK00YvK2PmcdrDhHEULKpVzJW8LWv5nmQrTGZ8JCbO4K01xX7tFVvD9ZcedeKvKqkPwEDatZg1Xa6W9ZcmNWqstQYcJ5qAosCOGX6Cy7x/v4GPWDT/03tgbD9M9WHotYd5pEWJitvIyOa0hJ5tiHHdPG7gKif0zCptPXk38UVRWWDqL+JZ3eRpGhuCyEBgbw3V/uIKjRBiwWr2dl8YzBNohKLbynsegtBgKZ+YOO9ZWl9aD80MAE6xDgumY9fEcG/Tc4dVb0Ui+B3tOyP7ILELA8W+WB/GuBQ7GdebFEqoudkX6NsDQKlmYP5rbNGyfgbvKTOgI0MvGmvv5Nv24erFSgkVVi4y1kMwpUmeAuzco2lN8u3V/luTxzN/lOyCZgG8n/RhY2PNx9dipBhlQTyAiNN8Mx167349cE88zGWZMdnAksVLpI8JZkLXRVMLdvKxiEqwmvi5hnLiDAxZIiyEe0tjIWAAI62MJPQK6/zVnom9xbyhKvjpB9WtWH+bAWeyhNTtQSypj5a1V1U1eLu4VVws87QE7gX7FGnu0uHabY8jSMDeprZLNMRG+1rK68+ASTIEB/6th3F/27S4dl4Nk/zInoI4CGp7NPU1cKCa8YxKBbFCi+gdQLw9J1txHvQYJfnmSEGVr/FtYNEkR0a5l7sdFhHF4U6WPdxFSi5KeAMqbkpS35zj6KE/Bm+x7nCWjqFsdQIhX5lBnfYtxJ6uslACkD/chPpyq6JusyesIXHSiduBFSqq1FN9UPUKOr2ZN6eYaynEwzv+leOVRJdMa9/6h8JUuidxp9zHv+Srf3dkIyb5USfLziJedWLf5ChF840IgJmXBufexmGW4lfxCBhOnvlK5u+0ZksIcQ8tMuZc9ePjx4HS3AcTpmr03aS/tSz+MZLBbYlAqML5LQPSVza8v3kagWnbqx+fwHa8k0FhvKSrFl8vYx1bBH0CAmKz8cCNqh7EijhnlatpsQx9sZA5dD5DacfY83PhFmFhvkVoi1FjdADCdPlghXOXEIyBRmYuYKAD+PG5TIpt8I1gtqY4+wI+f16BtvDgQVeatYEQtXdflQzIcOs3xs4Y+uYvddyR4Knx3XIIK6Xgi/KMn1h6ziWiAlCR93i+GvJvry/lJ9IVdsAbPrcf/d6WAewbSv5lvh2Nk06FTTds0CHmdU04KN6dFhg5LzLDfrfpsIJHO+Hfcyt6l+riniZo1mhRdoCXhiKQz1o8KcY6EsjlCZkwfZOHrN9R5uTeYE5HHIMBKt49wwz44mx4dDAPn7z9W34BtJa6p969R+U7t8fEKDlF011Q20O4xHf6ypjk3RlkEl3+DUziVbyFMpfYd86xFlQp1yDenBzEqqsbJ2LezjqpVZBIPN3rVeDTxC6J3vB6YkjledEU0s71XCQ1ZB/t/fz4yGZ88PkVdT+n8p7k/Th7CVrzPK4i2tE8cHEpRuouF2PYdIDPxHJWHldXg4tZpK2rOBpdOXdvNg1wzhukw1p8kHa4v/+5RT69kIUkrTGwhlvoAA+CN6ho8uUnRB8ldAQyTJkPk2SAnP0mAKmEbZFUnBjDVRl/wbhA+DJIi2ZSET/Zb+H/jIeVLlzxwVhHDZhg+8j8h1YOSODl6tphlTDDABsdzclvjHPWK8A1P5uUkK7km4CJMqtDBymugmYhW5Smk7E5MvBud33K5V5Pf99MV9mulEwb2JGByF7YShvU4U5KdRQ6kJq6SZ8XlPmsoqmhVtPChFwR92Gwq8wf0KAVljoQPrVBrwpbj6ok57JO6OJBwi48loedAgJJHfuJgQJHQtWB/vja8SpXTFqJUdd4aeN1kyxNVF5rbw8qTSkY13dr06t1c/U6j2UDJSb51HShXE3fim/slf7NN9fkeRIk1wshCa8C2/eHNdvRmXAeeAuxg40/43cVFB2hr0c0Zd+vywrm1L/kR9Q1WNoemu/bPd6WeIdg4RTaD7FvpIU9mbZfOU/7r3HlpBktVm1FoKqUkKKYEVd6K/7elAj71Dp4x+Bd2l4yK/p7IE5OZbXWHY88ePTQ+rXVGUUtv5WpOBMF9AKvb27qJASzbRP+BNIlGnw25wXWLi3Lm2euG3Yyo77x4k+Cq4xyuKCqc/12sCiXu5sSXbOYSYj5sPTig49sE3Vai0DJE/g/ysStzSUwPE55KQBIjUgEgl9cQjPNAjqux0mxZfLjpCbVdv9auxKvrXzRffGb/jUWrjZ4jyVVbTaqZ5OE9PLHb6HMx5meUKeWYimuNpiTVfaxBKmOho7rpXrwsX1ohsyU82AJzQ6H2xMWXgAiuuCKdUizfVNRCO3gV3zujZcJva3fkEJYU9d3PmzLi4KVUlrg+MlJZYfDIL65u6UmRgkgVBL6lNxe+BFS7vf+F7v3S1LIvuWdEj7Kj/JUfRWxH9XLIIqrvDRTCxEf9SeSQalHRwsrieYT34mOhvEdfHfFJtRh6dxIBjrX/Ih2EDLqqxys9w30eP/LgCdHieHEC6BsIDB/63Ea+Bcft4769BGqcFZc7efCvvIKHzTvago7SgWqS62kGVnGc8p2rFO4Jr2X4qlxS7pTrJDz/+b2LYHz3bzldqMj2FbhTfPhlt2+ro8LratTxNsaYdSXNJ7kjOChLRrkbg7HPXkiB1OR1zvs5jEh4nBq6ryzaduzY92Hvyuvwj08xLsVE5GSOJCL0X6gyG+EU8+EpcP7Iu9elRxGJa98YHs36rLaA0foNMlIZzYTqxouAmFbYFxoKF4UYL1Za0K+SObYK0nLBjT2AU3eZw6fx3OYI0JrCXBt68zza/vhplLkC8mt+B1RPA1auFDCOf7dSBA7a3vUE2K0oQRx1tTwZgjMAeBxRWVI/yo8OvdtlhGZ4O1xekNa0EogG4XrJ7/IklzIAEZd68OEtEwkMJTg4xmljo6K/uvvl58NuNcNvwZrPhEEDGn8TRvINA5Kud1XMHiZLH3GNWsJiMy2Zne7lK6aG9vITBqgSR33Oqr4mwMc0pXoPtRoos58dgnvjvt2DTKX1mYEpCpcoLNLSyKvEa4/L5dw0Yr8Jax2WTvgl3tcufjEeseEvh3bZqfqpZpna8gj7clbLi0G3Ct4op7tfdpT7Qu2Urx9gfuYoqBCc8xnQ8XYTnTAoTgP9hkfNWpAUf9v2Fx5xTtfGYw+RQfHrzCq5BmAmQ5EqneYfHf9NvKTY492kj2pxUFbzC4YSVcT9XOhXI4TAjMH6FcvU2YmvhpDnuAC/ZS0H7jv08IdNvdf7jjh/LHtATE9GHfmZUsbk0b2RgsDVPftcb+raw3hWkVssyhISxu/EJTrQHUH/v/DsGKuDAuP3CFClPN8j/FhDL4Gvi2bRAsNJ10pO5NVeWAAfc7BY4q3cuuYOL62pa7sBNrup+hoibES1GnyXJ3QwNfwS7+p8d1c+hmy6ve8SiIVbuapjmS0EKDZn89dNZO58QZMMmCZ5TGEsGCCFTk4zv1PzwxmmW460ilABDJl7jmw7lQbdOgxqfurE5vd7Y5dTHYiFKC5i7Ck0tronETYWABtmjJXDiuKn+TQ2fUlqI31GTLpOZY92HyffZKBIlJCjjIdhAVibPiYld+52yZF4fi1X/rB/cOMa+UUS8erP3Bwro5Ko7lSYvQeUO6tGj5Ze/tiwErIdk6pHNMcbhYNZ/1ivkCfovRES/ttgMmCTnt6jkRTe5JfYHBRp6/X4QiG2Z0ZGv9C4jtXrRs6fUgZd+gHiX/m7WclpShUQL7M72Kz+gLls7hhsIXDBjIuc452HCkrcI1Wx/n35gJcSfmImYxLDw3E2705nvX5CiqUcwFsga1U5HmGtnGMPTdOMGU//APOo8PzIrsxH3TXYX7ska92K3ndp19yoNhNoWQZbTpOChmBEXhjHH6T1+OscQIqlNA5kQqgdcOiax/qSMqjycja/NcYx3UKRSiJmqpy5Tg7E2J0MfMuHX5D0twJLgnz8CsVJbmr7+MKYNHOyHze7a/aC8xpS6wTqHSZsXvz3U3/oaVaQiy3XY7KpAdGJFObqaZ06L+fvnPMOc7ErC2mlcesJw6CKBIyc0Lvb7YszPbt1ePJ9MWxA87gkzCXFLml5acU6aqE+m2mCQ5HOduvnVbZbQuWNAbLoxcuY26hBU1LVDk9XEeFuJ9hrvzKd1rKZM9XaARYeQY+GaRphzapoRC+2EhFOYxNYER/3QhLlzC5fEdV1n/c8NnhQgpjdTsvjBZMH3wmHu1lSlcDnyVN8sTvOXF6M+jmLo6q5JxL1hEXqMfkwHzU3cHtXaRmDwVpRWzPuOk/nu/SQ3DSlQbLuFd6q0Bwvlt66NO4ydGOkSIUUvSRVvYbVSBmjV4sMzNlkwANFISSwgpm28doQCRlS6qcvJjktBM69fd/Hq0mxMHejwITiiQscUeTV6Gd4BKH27gPm55DWoWtl48rJ7WVabFxutN0oxfkKAtg0M8Z/8XH/W2uaq3xQjv+fdfCkjyO8FCfuiFKbEUELCYwHIU8UaFCSYJs6p+EQUWUwCIfBYGvX8iKevDx4h/IUFT5uFBLceeRM6w6ZAlclC+vGU7BnilCFGlvBGVAzoMv3lhUwI="
console.log(decode(test_data))

console.log("===========================")

// RSA 参数加密
function sort_ASCII(obj) {
    var arr = new Array;
    var num = 0;
    for (var i in obj) {
        arr[num] = i;
        num++
    }
    var sortArr = arr.sort();
    var sortObj = {};
    for (var i in sortArr) {
        sortObj[sortArr[i]] = obj[sortArr[i]]
    }
    return sortObj
}

function dataTojson(data) {
    var arr = [];
    var res = {};
    arr = data.split("&");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf("=") != -1) {
            var str = arr[i].split("=");
            if (str.length == 2) {
                res[str[0]] = str[1]
            } else {
                res[str[0]] = ""
            }
        } else {
            res[arr[i]] = ""
        }
    }
    return res
}

function getUuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1)
    }
    s[14] = "4";
    s[19] = hexDigits.substr(s[19] & 3 | 8, 1);
    s[8] = s[13] = s[18] = s[23];
    var uuid = s.join("");
    return uuid
}


let params_data = "page=1&limit=20"
const timestamp = Date.parse(new Date);
const requestId = getUuid();
params_data = JSON.stringify(sort_ASCII(dataTojson(params_data || "{}")));

// const sign = MD5(params_data + requestId + timestamp);
const sign = CryptoJS.MD5(params_data + requestId + timestamp).toString();
console.log(sign)

const paramPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvxXa98E1uWXnBzXkS2yHUfnBM6n3PCwLdfIox03T91joBvjtoDqiQ5x3tTOfpHs3LtiqMMEafls6b0YWtgB1dse1W5m+FpeusVkCOkQxB4SZDH6tuerIknnmB/Hsq5wgEkIvO5Pff9biig6AyoAkdWpSek/1/B7zYIepYY0lxKQIDAQAB";
const encrypt = new JSEncrypt;
encrypt.setPublicKey(paramPublicKey);
let encrypted_data = encrypt.encryptLong(params_data);
console.log(encrypted_data)