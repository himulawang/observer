/**
 * Created by ila on 5/19/2015.
 */
"use strict"
class SSHHandler {
    constructor(plugin) {
        this.plugin = plugin;
        this.receiveMessageCount = 0;
        this.stdoutAcknowledgeCount = 0;
        this.stderrAcknowledgeCount = 0;

        this.plugin.addEventListener('message', function(e) {
            var msg = JSON.parse(e.data);
            this.parse(msg);
        }.bind(this));
        this.plugin.addEventListener('crash', function (ev) {
            console.log('plugin crashed');
        });
    }

    get monitor() { return this._monitor; }

    set monitor(v) { this._monitor = v; }
    // receive
    parse(msg) {
        ++this.receiveMessageCount;
        if (msg.name in this) {
            this[msg.name](msg.arguments);
        } else {
            console.warn('Unsupported message type:', msg.name);
        }
    }
    write(argv) {
        let fd = argv[0];
        let data = argv[1];

        if (fd == 1 || fd == 2) {
            var str = atob(data);
            let ackCount = (fd == 1 ?
                this.stdoutAcknowledgeCount += str.length :
                this.stderrAcknowledgeCount += str.length);
            //console.log('write', str);

            setTimeout(function() {
                this.send('onWriteAcknowledge', [fd, ackCount]);
            }.bind(this), 0);
        }

        this.monitor.append(str);

        if (this.receiveMessageCount >= 10) return;
        let result = this.autoEnterRSAKeyFingerprin(str);
        if (!result) {
            result = this.autoEnterPassword(str);
        }
        if (!result) {
            result = this.autoEnterTailCommand(str);
        }
    }
    autoEnterRSAKeyFingerprin(str) {
        if (!/Are you sure you want to continue connecting \(yes\/no\)\?/.test(str)) return;
        this.type("yes\n");
        return true
    }
    autoEnterPassword(str) {
        var profile = this.monitor.profile;
        var regexp = new RegExp(profile.user + '@' + profile.host + "'s password");
        if (!regexp.test(str)) return;
        this.type(this.monitor.profile.password + "\n");
        return true
    }
    autoEnterTailCommand(str) {
        str = str.trim();
        var regexp = new RegExp("\]0;");
        if (!regexp.test(str)) return;
        this.type('tail -f ' + this.monitor.profile.filePath + "\n");
        return true
    }
    read(argv) {
        let fd = argv[0];
        let size = argv[1];

        this.send('onRead', [fd, '']);
    }
    exit(argv) {
        console.log('exit with code', argv[0]);
    }
    // send
    send(name, args) {
        let str = JSON.stringify({name: name, arguments: args});
        this.plugin.postMessage(str);
    }
    type(string) {
        this.send('onRead', [0, btoa(string)]);
    }
}
