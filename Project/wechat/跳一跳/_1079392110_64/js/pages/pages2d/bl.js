function r(r, n, o, g, f, s) {
    if (!(isNaN(s) || s < 1)) {
        s |= 0;
        var x, b, i, l, u, v, c, h, d, p, m, w, B, D, I, N, _, j, k, y, A, C, G, M, O, P = r, R = (x = P.getImageData(n, o, g, f)).data, q = s + s + 1, z = g - 1, E = f - 1, F = s + 1, H = F * (F + 1) / 2, J = new t(), K = J;
        for (l = 1; l < q; l++) if (K = K.next = new t(), l == F) var L = K;
        K.next = J;
        var Q = null, S = null;
        h = c = 0;
        var T = a[s], U = e[s];
        for (i = 0; i < f; i++) {
            for (_ = j = k = y = d = p = m = w = 0, B = F * (A = R[c]), D = F * (C = R[c + 1]), 
            I = F * (G = R[c + 2]), N = F * (M = R[c + 3]), d += H * A, p += H * C, m += H * G, 
            w += H * M, K = J, l = 0; l < F; l++) K.r = A, K.g = C, K.b = G, K.a = M, K = K.next;
            for (l = 1; l < F; l++) u = c + ((z < l ? z : l) << 2), d += (K.r = A = R[u]) * (O = F - l), 
            p += (K.g = C = R[u + 1]) * O, m += (K.b = G = R[u + 2]) * O, w += (K.a = M = R[u + 3]) * O, 
            _ += A, j += C, k += G, y += M, K = K.next;
            for (Q = J, S = L, b = 0; b < g; b++) R[c + 3] = M = w * T >> U, 0 != M ? (M = 255 / M, 
            R[c] = (d * T >> U) * M, R[c + 1] = (p * T >> U) * M, R[c + 2] = (m * T >> U) * M) : R[c] = R[c + 1] = R[c + 2] = 0, 
            d -= B, p -= D, m -= I, w -= N, B -= Q.r, D -= Q.g, I -= Q.b, N -= Q.a, u = h + ((u = b + s + 1) < z ? u : z) << 2, 
            d += _ += Q.r = R[u], p += j += Q.g = R[u + 1], m += k += Q.b = R[u + 2], w += y += Q.a = R[u + 3], 
            Q = Q.next, B += A = S.r, D += C = S.g, I += G = S.b, N += M = S.a, _ -= A, j -= C, 
            k -= G, y -= M, S = S.next, c += 4;
            h += g;
        }
        for (b = 0; b < g; b++) {
            for (j = k = y = _ = p = m = w = d = 0, B = F * (A = R[c = b << 2]), D = F * (C = R[c + 1]), 
            I = F * (G = R[c + 2]), N = F * (M = R[c + 3]), d += H * A, p += H * C, m += H * G, 
            w += H * M, K = J, l = 0; l < F; l++) K.r = A, K.g = C, K.b = G, K.a = M, K = K.next;
            for (v = g, l = 1; l <= s; l++) c = v + b << 2, d += (K.r = A = R[c]) * (O = F - l), 
            p += (K.g = C = R[c + 1]) * O, m += (K.b = G = R[c + 2]) * O, w += (K.a = M = R[c + 3]) * O, 
            _ += A, j += C, k += G, y += M, K = K.next, l < E && (v += g);
            for (c = b, Q = J, S = L, i = 0; i < f; i++) R[(u = c << 2) + 3] = M = w * T >> U, 
            M > 0 ? (M = 255 / M, R[u] = (d * T >> U) * M, R[u + 1] = (p * T >> U) * M, R[u + 2] = (m * T >> U) * M) : R[u] = R[u + 1] = R[u + 2] = 0, 
            d -= B, p -= D, m -= I, w -= N, B -= Q.r, D -= Q.g, I -= Q.b, N -= Q.a, u = b + ((u = i + F) < E ? u : E) * g << 2, 
            d += _ += Q.r = R[u], p += j += Q.g = R[u + 1], m += k += Q.b = R[u + 2], w += y += Q.a = R[u + 3], 
            Q = Q.next, B += A = S.r, D += C = S.g, I += G = S.b, N += M = S.a, _ -= A, j -= C, 
            k -= G, y -= M, S = S.next, c += g;
        }
        P.putImageData(x, n, o), console.log("end ?");
    }
}

function t() {
    this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.stackBlurCanvasRGBA = r;

var a = [ 512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259 ], e = [ 9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24 ];