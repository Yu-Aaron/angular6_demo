import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-incident-detail',
    templateUrl: './incident-detail.component.html',
    styleUrls: ['./incident-detail.component.scss']
})
export class IncidentDetailComponent implements OnInit {
    incident = {
        incidentName: '发现威胁[INFO STUN协议 (STUN Binding 请求包含废弃的 rfc 3489 CHANGE-REQUEST 属性 - change IP flag 0 change port flag 1)]',
        packetLength: 66,
        securityAreaName: 'UXTEST网络设备',
        devicePort: 'GE2',
        protocol: 'TCP',
        appLayerProtocol: 'modbus',
        protocolDetail: '{protocol,func}',
        matchedKey: 'secure: NETBIOS_SMB_Session_Setup_NTMLSSP_unicode_asn1_overflow_attempt',
        a: 'A0 36 9F 1A 63 68 A0 36 9F 1A 63 3C 08 00 45 00 00 34 2B 5B 40 00 80 06 CB 64 01 01 01 01 01 01 01 02 CF 7D 01 F6 B4 2A BA 7E 5B EB 7C 28 50 18 00 FF 6F 1A 00 00 22 07 00'
    };

    constructor() {
    }

    ngOnInit() {
    }

}
