import { Alchemy, Network, Utils } from 'alchemy-sdk';
import bigInt from 'big-integer';
import moment from 'moment';

class Util {
    isValidEthereumAddress(address) {
        return /^0x[0-9a-fA-F]{40}$/.test(address);
    }
    isUnsignedInt(str) {
        return /^\d+$/.test(str);
    }

    formatGas(gasHex) {
        return typeof gasHex === "string" ? Utils.formatEther(bigInt(gasHex.slice(2, gasHex.length), 16).toString()).slice(0, 5) : gasHex.toString().slice(0, 5);
    }
    formatGasPrice(gasHex) {
        return Utils.formatUnits(bigInt(gasHex.slice(2, gasHex.length), 16).toString(), "gwei") + " Gwei";
    }

    formatDate(date) {
        return typeof date === 'string' ? moment(date).fromNow() : moment(date * 1000).fromNow();
    }
    isHexString(hex) {
        return Utils.isHexString(hex);
    }
    formatAddressEllipsisEnd(address) {
        return address.slice(0, 16) + "...";
    }
    formatAddressEllipsisCenter(address) {
        return address.slice(0, 8)
            + "..."
            + address.slice(address.length - 8, address.length);
    }
}

export const util = new Util();
export const alchemy = new Alchemy({
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
});