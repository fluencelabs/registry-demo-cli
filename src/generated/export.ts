/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.7.0-286
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v3';


// Services

export interface GreetingServiceDef {
    greeting: (name: string, callParams: CallParams<'name'>) => string | Promise<string>;
}
export function registerGreetingService(serviceId: string, service: GreetingServiceDef): void;
export function registerGreetingService(peer: FluencePeer, serviceId: string, service: GreetingServiceDef): void;
       

export function registerGreetingService(...args: any) {
    registerService(
        args,
        {
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "greeting" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "labeledProduct",
                    "fields" : {
                        "name" : {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    }
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    ]
                }
            }
        }
    }
}
    );
}
      
// Functions
 

export function registerForRouteNode(
    subscriber_node_id: string,
    label: string,
    value: string,
    service_id: string | null,
    config?: {ttl?: number}
): Promise<void>;

export function registerForRouteNode(
    peer: FluencePeer,
    subscriber_node_id: string,
    label: string,
    value: string,
    service_id: string | null,
    config?: {ttl?: number}
): Promise<void>;

export function registerForRouteNode(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (seq
                              (seq
                               (seq
                                (seq
                                 (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                                 (call %init_peer_id% ("getDataSrv" "subscriber_node_id") [] subscriber_node_id)
                                )
                                (call %init_peer_id% ("getDataSrv" "label") [] label)
                               )
                               (call %init_peer_id% ("getDataSrv" "value") [] value)
                              )
                              (call %init_peer_id% ("getDataSrv" "service_id") [] service_id)
                             )
                             (call %init_peer_id% ("peer" "timestamp_sec") [] t)
                            )
                            (xor
                             (call -relay- ("registry" "get_route_bytes") [label [] t [] ""] bytes)
                             (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                            )
                           )
                           (call %init_peer_id% ("sig" "sign") [bytes] signature)
                          )
                          (xor
                           (call -relay- ("registry" "get_route_id") [label %init_peer_id%] route_id)
                           (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                          )
                         )
                         (xor
                          (call -relay- ("registry" "get_host_record_bytes") [route_id value [] service_id t []] bytes-0)
                          (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                         )
                        )
                        (call %init_peer_id% ("sig" "sign") [bytes-0] signature-0)
                       )
                       (call -relay- ("op" "noop") [])
                      )
                      (xor
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (call subscriber_node_id ("peer" "timestamp_sec") [] t-0)
                             (call subscriber_node_id ("trust-graph" "get_weight") [%init_peer_id% t-0] weight)
                            )
                            (call subscriber_node_id ("registry" "put_host_record") [route_id value [] service_id t [] signature-0.$.signature.[0]! weight t-0] result)
                           )
                           (call subscriber_node_id ("op" "string_to_b58") [route_id] k)
                          )
                          (call subscriber_node_id ("kad" "neighborhood") [k [] []] nodes)
                         )
                         (par
                          (fold nodes n
                           (par
                            (xor
                             (xor
                              (seq
                               (seq
                                (seq
                                 (seq
                                  (seq
                                   (call n ("peer" "timestamp_sec") [] t-1)
                                   (call n ("trust-graph" "get_weight") [%init_peer_id% t-1] weight-0)
                                  )
                                  (call n ("registry" "register_route") [label [] t [] "" signature.$.signature.[0]! false weight-0 t-1] result-0)
                                 )
                                 (call n ("peer" "timestamp_sec") [] t-2)
                                )
                                (call n ("trust-graph" "get_weight") [%init_peer_id% t-2] weight-1)
                               )
                               (call n ("registry" "propagate_host_record") [result t-2 weight-1] result-1)
                              )
                              (null)
                             )
                             (seq
                              (call -relay- ("op" "noop") [])
                              (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                             )
                            )
                            (next n)
                           )
                          )
                          (null)
                         )
                        )
                        (call -relay- ("op" "noop") [])
                       )
                       (seq
                        (call -relay- ("op" "noop") [])
                        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 5])
                       )
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 6])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "registerForRouteNode",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "subscriber_node_id" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "label" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "value" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "service_id" : {
                    "tag" : "option",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                }
            }
        },
        "codomain" : {
            "tag" : "nil"
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function createRouteAndRegister(
    label: string,
    value: string,
    relay_id: string | null,
    service_id: string | null,
    config?: {ttl?: number}
): Promise<string>;

export function createRouteAndRegister(
    peer: FluencePeer,
    label: string,
    value: string,
    relay_id: string | null,
    service_id: string | null,
    config?: {ttl?: number}
): Promise<string>;

export function createRouteAndRegister(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (seq
                              (seq
                               (seq
                                (seq
                                 (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                                 (call %init_peer_id% ("getDataSrv" "label") [] label)
                                )
                                (call %init_peer_id% ("getDataSrv" "value") [] value)
                               )
                               (call %init_peer_id% ("getDataSrv" "relay_id") [] relay_id)
                              )
                              (call %init_peer_id% ("getDataSrv" "service_id") [] service_id)
                             )
                             (call %init_peer_id% ("peer" "timestamp_sec") [] t)
                            )
                            (xor
                             (call -relay- ("registry" "get_route_bytes") [label [] t [] ""] bytes)
                             (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                            )
                           )
                           (call %init_peer_id% ("sig" "sign") [bytes] signature)
                          )
                          (xor
                           (call -relay- ("registry" "get_route_id") [label %init_peer_id%] route_id)
                           (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                          )
                         )
                         (xor
                          (call -relay- ("registry" "get_record_bytes") [route_id value relay_id service_id t []] bytes-0)
                          (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                         )
                        )
                        (call %init_peer_id% ("sig" "sign") [bytes-0] signature-0)
                       )
                       (xor
                        (seq
                         (seq
                          (call -relay- ("op" "string_to_b58") [route_id] k)
                          (call -relay- ("kad" "neighborhood") [k [] []] nodes)
                         )
                         (par
                          (fold nodes n
                           (par
                            (xor
                             (xor
                              (seq
                               (seq
                                (seq
                                 (seq
                                  (seq
                                   (call n ("peer" "timestamp_sec") [] t-0)
                                   (call n ("trust-graph" "get_weight") [%init_peer_id% t-0] weight)
                                  )
                                  (call n ("registry" "register_route") [label [] t [] "" signature.$.signature.[0]! false weight t-0] result)
                                 )
                                 (call n ("peer" "timestamp_sec") [] t-1)
                                )
                                (call n ("trust-graph" "get_weight") [%init_peer_id% t-1] weight-0)
                               )
                               (call n ("registry" "put_record") [route_id value relay_id service_id t [] signature-0.$.signature.[0]! weight-0 t-1] result-0)
                              )
                              (null)
                             )
                             (seq
                              (call -relay- ("op" "noop") [])
                              (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                             )
                            )
                            (next n)
                           )
                          )
                          (null)
                         )
                        )
                        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 5])
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [route_id])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 6])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 7])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "createRouteAndRegister",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "label" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "value" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "relay_id" : {
                    "tag" : "option",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                },
                "service_id" : {
                    "tag" : "option",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "scalar",
                    "name" : "string"
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function greeting(
    route_id: string,
    message: string,
    config?: {ttl?: number}
): Promise<string[]>;

export function greeting(
    peer: FluencePeer,
    route_id: string,
    message: string,
    config?: {ttl?: number}
): Promise<string[]>;

export function greeting(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "route_id") [] route_id)
                        )
                        (call %init_peer_id% ("getDataSrv" "message") [] message)
                       )
                       (new $res
                        (seq
                         (seq
                          (new $res-0
                           (xor
                            (seq
                             (seq
                              (seq
                               (seq
                                (call -relay- ("op" "string_to_b58") [route_id] k)
                                (call -relay- ("kad" "neighborhood") [k [] []] nodes)
                               )
                               (par
                                (fold nodes n
                                 (par
                                  (seq
                                   (xor
                                    (xor
                                     (seq
                                      (seq
                                       (call n ("peer" "timestamp_sec") [] t)
                                       (call n ("registry" "get_records") [route_id t] get_result)
                                      )
                                      (ap get_result.$.result! $res-0)
                                     )
                                     (null)
                                    )
                                    (seq
                                     (call -relay- ("op" "noop") [])
                                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                                    )
                                   )
                                   (call -relay- ("op" "noop") [])
                                  )
                                  (next n)
                                 )
                                )
                                (null)
                               )
                              )
                              (call -relay- ("op" "noop") [$res-0.$.[5]!])
                             )
                             (call -relay- ("registry" "merge") [$res-0] result)
                            )
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                           )
                          )
                          (fold result.$.result! p
                           (seq
                            (seq
                             (seq
                              (call -relay- ("op" "noop") [])
                              (fold p.$.relay_id! -via-peer-
                               (seq
                                (call -via-peer- ("op" "noop") [])
                                (next -via-peer-)
                               )
                              )
                             )
                             (xor
                              (seq
                               (seq
                                (call p.$.peer_id! (p.$.service_id.[0]! "greeting") [message] $res)
                                (fold p.$.relay_id! -via-peer-
                                 (seq
                                  (next -via-peer-)
                                  (call -via-peer- ("op" "noop") [])
                                 )
                                )
                               )
                               (call -relay- ("op" "noop") [])
                              )
                              (seq
                               (seq
                                (fold p.$.relay_id! -via-peer-
                                 (seq
                                  (call -via-peer- ("op" "noop") [])
                                  (next -via-peer-)
                                 )
                                )
                                (call -relay- ("op" "noop") [])
                               )
                               (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                              )
                             )
                            )
                            (next p)
                           )
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$res] res-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 5])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "greeting",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "route_id" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "message" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}
