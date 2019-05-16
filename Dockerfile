FROM alpine:3.9

RUN apk add --no-cache git gcc musl-dev openssl-dev libffi-dev bash python3 python3-dev

COPY /requirements.txt /
RUN pip3 install --upgrade pip && pip3 install -r requirements.txt

RUN git config --global user.name "travis (Lukas Woodtli)" &&  git config --global user.email lukas_woodtli@travis.example.com


ENTRYPOINT ["python3"]

