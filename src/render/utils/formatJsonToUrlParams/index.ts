import type { instanceObject } from "@/types";

/**
 * JSON转url参数
 * @param data Json格式数据
 * */
export const formatJsonToUrlParams = (data: instanceObject) => {
    return typeof data === "object"
        ? Object.keys(data)
            .map((key) => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
            })
            .join("&")
        : "";
};
