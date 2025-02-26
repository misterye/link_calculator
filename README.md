## 两个主要功能

1. 卫星链路效率计算
2. 卫星功放功率换算

## 功能描述如下：

## 1. 链路效率计算

上行链路和下行链路的 modcod 不同，分开计算。

计算公式：

公式（1）通过 datarate 和 modcod 计算 symbolrate、bandwidth、efficiency

symbolrate = datarate / ( mod_fact * viterbi_fec * rs_code )

bandwidth = symbolrate * ( 1 + roll_off )

efficiency = datarate /  bandwidth

公式（2）通过 symbolrate 和 modcod 计算 datarate、bandwith、efficiency

datarate = symbolrate * ( mod_fact * viterbi_fec * rs_code )

bandwidth = symbolrate * ( 1 + roll_off )

efficiency = datarate /  bandwidth

计算单位：

datarate: kbps

symbolrate: ksps

bandwith: kHz

efficiency: bps/Hz

常数定义：

rs_code = 188/204（约为 0.9216，可在程序中计算得出，小数保留 4 位有效数字）

roll_off = 0.05（滚降因子）

调制因子：

mod_fact =  {
"BPSK": 1,
"QPSK": 2,
"8PSK": 3,
"16APSK": 4,
"32APSK": 5,
"64APSK": 6,
"128APSK": 7,
"256APSK": 8
}

调制因子取值方式：比如，当 modcod 为 QPSK 3/4 时，viterbi_fec = 3/4，以此类推，所以 viterbi_fec 是根据所选的 modcod 来取值的。

下行 modcod：

downlink_modcods:

[
"BPSK 1/5", "BPSK 11/45", "BPSK 4/15", "BPSK 1/3", "QPSK 2/9",
"QPSK 11/45", "QPSK 1/4", "QPSK 4/15", "QPSK 13/45", "QPSK 14/45",
"QPSK 1/3", "QPSK 2/5", "QPSK 9/20", "QPSK 7/15", "QPSK 1/2", "QPSK 11/20",
"QPSK 8/15", "QPSK 3/5", "QPSK 2/3", "QPSK 32/45", "QPSK 3/4", "QPSK 4/5",
"QPSK 5/6", "QPSK 8/9", "QPSK 9/10", "8PSK 7/15", "8PSK 8/15", "8PSK 3/5",
"8PSK 26/45", "8PSK 23/36", "8PSK 2/3", "8PSK 25/36", "8PSK 13/18",
"8PSK 32/45", "8PSK 3/4", "8PSK 5/6", "8PSK 8/9", "8PSK 9/10",
"16APSK 1/2-L", "16APSK 7/15", "16APSK 8/15-L", "16APSK 5/9-L",
"16APSK 8/15", "16APSK 3/5-L", "16APSK 26/45", "16APSK 3/5",
"16APSK 28/45", "16APSK 23/36", "16APSK 2/3-L", "16APSK 2/3",
"16APSK 25/36", "16APSK 13/18", "16APSK 32/45", "16APSK 3/4", "16APSK 7/9",
"16APSK 4/5", "16APSK 5/6", "16APSK 77/90", "16APSK 8/9", "16APSK 9/10",
"32APSK 2/3-L", "32APSK 2/3", "32APSK 32/45", "32APSK 11/15", "32APSK 3/4",
"32APSK 7/9", "32APSK 4/5", "32APSK 5/6", "32APSK 8/9", "32APSK 9/10",
"64APSK 32/45-L", "64APSK 11/15", "64APSK 7/9", "64APSK 4/5", "64APSK 5/6",
"128APSK 3/4", "128APSK 7/9", "256APSK 29/45-L", "256APSK 2/3-L",
"256APSK 31/45-L", "256APSK 32/45", "256APSK 11/15-L", "256APSK 3/4"
]

上行 modcod：

uplink_modcods:

[
"QPSK-7/20", "QPSK-2/5", "QPSK-9/20", "QPSK-1/2", "QPSK-11/20", "QPSK-3/5",
"QPSK-13/20", "QPSK-7/10", "QPSK-3/4", "QPSK-4/5", "QPSK-17/20",
"8PSK-7/15", "8PSK-1/2", "8PSK-8/15", "8PSK-17/30", "8PSK-3/5",
"8PSK-19/30", "8PSK-2/3", "8PSK-7/10", "8PSK-11/15", "16APSK-2/5",
"16APSK-17/40", "16APSK-9/20", "16APSK-19/40", "16APSK-1/2",
"16APSK-21/40", "16APSK-11/20", "16APSK-23/40", "16APSK-3/5", "16APSK-5/8",
"16APSK-13/20", "16APSK-27/40", "16APSK-7/10", "16APSK-29/40",
"16APSK-3/4", "16APSK-31/40", "16APSK-4/5", "64APSK-31/60", "64APSK-8/15",
"64APSK-11/20", "64APSK-17/30", "64APSK-7/12", "64APSK-3/5",
"64APSK-37/60", "64APSK-19/30", "64APSK-13/20", "64APSK-2/3",
"64APSK-41/60", "64APSK-7/10", "64APSK-43/60", "64APSK-11/15",
"64APSK-3/4", "64APSK-23/30", "64APSK-47/60", "64APSK-4/5", "64APSK-49/60",
"64APSK-5/6", "64APSK-17/20", "64APSK-13/15", "64APSK-53/6"
]

上行链路或下行链路都具备以下功能：

用户输入datarate，选择 modcod ，根据公式（1）计算：

数据速率（datarate）：直接从用户输入读取

符号速率（symbolrate）：计算后填入

占用带宽（bandwith）：计算后填入

利用效率（efficiency）：计算后填入

例如：

modcod 选 QPSK 3/4，datarate 输入 1000，那么：

数据速率（datarate）：1000 kbps

符号速率（symbolrate）：723.066 ksps (-3%)

占用带宽（bandwith）：759.219 kHz (-3%)

利用效率（efficiency）：1.317 bps/Hz

用户输入symbolrate，选择 modcod ，根据公式（2）计算：

符号速率（symbolrate）：直接从用户输入读取

数据速率（datarate）：计算后填入

占用带宽（bandwith）：计算后填入

利用效率（efficiency）：计算后填入

例如：

modcod 选 QPSK 3/4，symbolrate 输入 1000，那么：

符号速率（symbolrate）：1000 ksps (-3%)

数据速率（datarate）：1383.000 kbps

占用带宽（bandwith）：1050.000 kHz (-3%)

利用效率（efficiency）：1.317 bps/Hz

## 2. 功放功率计算

卫星功放的功率值通常有两种表示方式，一种是以 Watts 为单位表示，一种是以 dBm 为单位表示，所以程序具备两种单位互相换算的功能。

（1）用户输入单位为 Watts 的功率值，程序根据以下公式计算出 dBm 的功率值：

P(dBm) = 10 * Log10(P(W)) + 10 * Log(10)(1000(mW))

例如：

如果用户输入 BUC 输出功率为：8 W

那么：

BUC 的输出功率为：39.03 dBm

（1）用户输入单位为 dBm 的功率值，程序根据以下公式计算出 Watts 的功率值：

P(W) = 10^((P(W)/10)-3)

例如：

如果用户输入 BUC 输出功率为：38 dBm

那么：

BUC 的输出功率为：6.30957344480193 W
