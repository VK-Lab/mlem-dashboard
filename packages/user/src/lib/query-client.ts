// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { cache } from "react";

import { QueryClient } from "@tanstack/query-core";

export const getQueryClient = cache(() => new QueryClient());
